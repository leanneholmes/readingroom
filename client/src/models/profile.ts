import { User } from "./user";

export interface IProfile {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}

export class Profile implements IProfile {
  constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
  }

  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}

export interface Photo {
  id: string;
  url: string;
}

export interface UserBookClub {
  id: string;
  name: string;
  category: string;
  readingPace: string;
}
