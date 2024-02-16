import { makeAutoObservable } from "mobx";
import { BookClub } from "../models/bookclub";
import agent from "../utils/agent";

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
}
