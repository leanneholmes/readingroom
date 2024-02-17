import { makeAutoObservable, runInAction } from "mobx";
import { BookClub } from "../models/bookclub";
import agent from "../utils/agent";
import { v4 as uuid } from "uuid";

export default class BookClubStore {
  bookClubRegistry = new Map<string, BookClub>();
  selectedBookClub?: BookClub = undefined;
  editMode = false;
  bookClubs: BookClub[] = [];
  loadingInitial = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get bookClubsAsMap() {
    // Possibly add sorting logic here
    return Array.from(this.bookClubRegistry.values());
  }

  loadBookClubs = async () => {
    this.setLoadingInitial(true);
    try {
      const bookClubs = await agent.BookClubs.list();
      bookClubs.forEach((bookClub) => {
        this.setBookClub(bookClub);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  selectBookClub = (id: string) => {
    this.selectedBookClub = this.bookClubRegistry.get(id);
  };

  cancelSelectedBookClub = () => {
    this.selectedBookClub = undefined;
  };

  loadBookClub = async (id: string) => {
    let bookClub = this.getBookClub(id);
    if (bookClub) this.selectedBookClub = bookClub;
    else {
      this.setLoadingInitial(true);
      try {
        bookClub = await agent.BookClubs.details(id);
        this.setBookClub(bookClub);
        this.selectedBookClub = bookClub;
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setBookClub = (bookClub: BookClub) => {
    bookClub.nextMeeting = bookClub.nextMeeting.split("T")[0];
    this.bookClubRegistry.set(bookClub.id, bookClub);
  };

  private getBookClub = (id: string) => {
    return this.bookClubRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createBookClub = async (bookClub: BookClub) => {
    this.loading = true;
    bookClub.id = uuid();
    try {
      await agent.BookClubs.create(bookClub);
      runInAction(() => {
        this.bookClubRegistry.set(bookClub.id, bookClub);
        // this.bookClubs.push(bookClub);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateBookClub = async (bookClub: BookClub) => {
    this.loading = true;
    try {
      await agent.BookClubs.update(bookClub);
      runInAction(() => {
        this.bookClubRegistry.set(bookClub.id, bookClub);
        // this.bookClubs = [
        //   ...this.bookClubs.filter((b) => b.id !== bookClub.id),
        //   bookClub,
        // ];
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
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
}
