import { makeAutoObservable, runInAction } from "mobx";
import { BookClub } from "../models/bookclub";
import agent from "../utils/agent";
import { v4 as uuid } from "uuid";

export default class BookClubStore {
  bookClubs: BookClub[] = [];
  loadingInitial = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadBookClubs = async () => {
    this.setLoadingInitial(true);
    try {
      const bookClubs = await agent.BookClubs.list();
      bookClubs.forEach((bookClub) => {
        bookClub.nextMeeting = bookClub.nextMeeting.split("T")[0];
        this.bookClubs.push(bookClub);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
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
        this.bookClubs.push(bookClub);
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
        this.bookClubs = [
          ...this.bookClubs.filter((b) => b.id !== bookClub.id),
          bookClub,
        ];
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
