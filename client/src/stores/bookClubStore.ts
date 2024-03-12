import { makeAutoObservable, reaction, runInAction } from "mobx";
import { BookClub, BookClubFormValues } from "../models/bookclub";
import agent from "../utils/agent";
import { v4 as uuid } from "uuid";
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";

export default class BookClubStore {
  bookClubRegistry = new Map<string, BookClub>();
  selectedBookClub?: BookClub = undefined;
  editMode = false;
  bookClubs: BookClub[] = [];
  loadingInitial = false;
  loading = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.bookClubRegistry.clear();
        this.loadBookClubs();
      }
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        this.predicate.delete(key);
      });
    };
    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isMember":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isOwner":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "Category":
        this.predicate.delete("Category");
        this.predicate.set("Category", value);
        break;
      case "ReadingPace":
        this.predicate.delete("ReadingPace");
        this.predicate.set("ReadingPace", value);
        break;
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pagesize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  get bookClubsAsMap() {
    return Array.from(this.bookClubRegistry.values());
  }

  loadBookClubs = async () => {
    this.bookClubRegistry.clear();
    this.setLoadingInitial(true);
    try {
      const result = await agent.BookClubs.list(this.axiosParams);
      if (result.data) {
        result.data.forEach((bookClub) => {
          this.setBookClub(bookClub);
        });
      }
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  selectBookClub = (id: string) => {
    this.selectedBookClub = this.bookClubRegistry.get(id);
  };

  cancelSelectedBookClub = () => {
    this.selectedBookClub = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectBookClub(id) : this.cancelSelectedBookClub();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  loadBookClub = async (id: string) => {
    let bookClub = this.getBookClub(id);
    if (bookClub) {
      this.selectedBookClub = bookClub;
      return bookClub;
    } else {
      this.setLoadingInitial(true);
      try {
        bookClub = await agent.BookClubs.details(id);
        this.setBookClub(bookClub);
        runInAction(() => {
          this.selectedBookClub = bookClub;
        });
        this.setLoadingInitial(false);
        return bookClub;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setBookClub = (bookClub: BookClub) => {
    const user = store.userStore.user;
    if (user) {
      bookClub.isMember = bookClub.members!.some(
        (a) => a.username === user.username
      );
      bookClub.isOwner = bookClub.ownerUsername === user.username;
      bookClub.owner = bookClub.members?.find(
        (x) => x.username === bookClub.ownerUsername
      );
    }
    bookClub.nextMeeting = new Date(bookClub.nextMeeting!);
    this.bookClubRegistry.set(bookClub.id, bookClub);
  };

  private getBookClub = (id: string) => {
    return this.bookClubRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createBookClub = async (bookClub: BookClubFormValues) => {
    const user = store.userStore.user;
    const member = new Profile(user!);
    bookClub.id = uuid();
    try {
      await agent.BookClubs.create(bookClub);
      const newBookClub = new BookClub(bookClub);
      newBookClub.ownerUsername = user!.username;
      newBookClub.members = [member];
      this.setBookClub(newBookClub);
      runInAction(() => {
        this.selectedBookClub = newBookClub;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateBookClub = async (bookClub: BookClubFormValues) => {
    try {
      await agent.BookClubs.update(bookClub);
      runInAction(() => {
        if (bookClub.id) {
          const updatedBookClub = {
            ...this.getBookClub(bookClub.id),
            ...bookClub,
          };
          this.bookClubRegistry.set(bookClub.id, updatedBookClub as BookClub);
          this.selectedBookClub = updatedBookClub as BookClub;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteBookClub = async (id: string) => {
    this.loading = true;
    try {
      await agent.BookClubs.delete(id);
      runInAction(() => {
        this.bookClubRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateMembership = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.BookClubs.join(this.selectedBookClub!.id);
      runInAction(() => {
        if (this.selectedBookClub?.isMember) {
          this.selectedBookClub.members = this.selectedBookClub.members?.filter(
            (a) => a.username !== user?.username
          );
          this.selectedBookClub.isMember = false;
        } else {
          const member = new Profile(user!);
          this.selectedBookClub?.members?.push(member);
          this.selectedBookClub!.isMember = true;
        }
        this.bookClubRegistry.set(
          this.selectedBookClub!.id,
          this.selectedBookClub!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedBookClub = () => {
    this.selectedBookClub = undefined;
  };
}
