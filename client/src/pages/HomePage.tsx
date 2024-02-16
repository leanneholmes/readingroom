import { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { BookClub } from "../models/bookclub";
import agent from "../utils/agent";
import BookClubList from "../components/BookClubList";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function HomePage() {
  const { bookClubStore } = useStore();
  const [bookClubs, setBookClubs] = useState<BookClub[]>([]);

  useEffect(() => {
    agent.BookClubs.list().then((response) => {
      let bookClubs: BookClub[] = [];
      response.forEach((bookClub) => {
        bookClub.nextMeeting = bookClub.nextMeeting.split("T")[0];
        bookClubs.push(bookClub);
      });
      setBookClubs(bookClubs);
    });
  }, []);
  return (
    <Container style={{ marginTop: "6em" }}>
      <h1>Homepage</h1>
      <BookClubList bookClubs={bookClubs} />
    </Container>
  );
}

export default observer(HomePage);
