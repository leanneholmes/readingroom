import { Profile } from "./profile";

export interface IBookClub {
  id: string;
  name: string;
  description: string;
  category: string;
  readingPace: string;
  nextMeeting: Date | null;
  meetingLink: string;
  currentBook: string;
  currentBookAuthor: string;
  ownerUsername?: string;
  isMember: boolean;
  isOwner: boolean;
  owner?: Profile;
  members?: Profile[];
}

export class BookClub implements IBookClub {
  constructor(init: BookClubFormValues) {
    this.id = init.id!;
    this.name = init.name;
    this.description = init.description;
    this.category = init.category;
    this.readingPace = init.readingPace;
    this.nextMeeting = init.nextMeeting;
    this.meetingLink = init.meetingLink;
    this.currentBook = init.currentBook;
    this.currentBookAuthor = init.currentBookAuthor;
  }

  id: string;
  name: string;
  description: string;
  category: string;
  readingPace: string;
  nextMeeting: Date | null;
  meetingLink: string;
  currentBook: string;
  currentBookAuthor: string;
  ownerUsername?: string = "";
  isMember: boolean = false;
  isOwner: boolean = false;
  owner?: Profile;
  members?: Profile[];
}

export class BookClubFormValues {
  id?: string = undefined;
  name: string = "";
  description: string = "";
  category: string = "";
  readingPace: string = "";
  nextMeeting: Date | null = null;
  meetingLink: string = "";
  currentBook: string = "";
  currentBookAuthor: string = "";

  constructor(bookClub?: BookClubFormValues) {
    if (bookClub) {
      this.id = bookClub.id;
      this.name = bookClub.name;
      this.description = bookClub.description;
      this.category = bookClub.category;
      this.readingPace = bookClub.readingPace;
      this.nextMeeting = bookClub.nextMeeting;
      this.meetingLink = bookClub.meetingLink;
      this.currentBook = bookClub.currentBook;
      this.currentBookAuthor = bookClub.currentBookAuthor;
    }
  }
}
