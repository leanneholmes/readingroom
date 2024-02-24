export interface BookClub {
  id: string;
  name: string;
  description: string;
  category: string;
  readingPace: string;
  nextMeeting: Date | null;
  meetingLink: string;
  currentBook: string;
  currentBookAuthor: string;
}
