import { makeAutoObservable } from "mobx";
import { BookClub } from "../models/bookclub";
import agent from "../utils/agent";

export default class BookClubStore {
  bookClubs: BookClub[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadBookClubs = async () => {
    try {
      const bookClubs = await agent.BookClubs.list();
      bookClubs.forEach((bookClub) => {
        bookClub.nextMeeting = bookClub.nextMeeting.split("T")[0];
        this.bookClubs.push(bookClub);
      });
    } catch (error) {
      console.log(error);
    }
  };
}
