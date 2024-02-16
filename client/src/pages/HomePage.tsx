import { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { BookClub } from "../models/bookclub";
import agent from "../utils/agent";
import BookClubList from "../components/BookClubList";
import LoadingComponent from "../components/LoadingComponent";

function HomePage() {
  const [bookClubs, setBookClubs] = useState<BookClub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.BookClubs.list().then((response) => {
      let bookClubs: BookClub[] = [];
      response.forEach((bookClub) => {
        bookClub.nextMeeting = bookClub.nextMeeting.split("T")[0];
        bookClubs.push(bookClub);
      });
      setBookClubs(bookClubs);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingComponent />;
  return (
    <Container style={{ marginTop: "6em" }}>
      <h1>Homepage</h1>
      <BookClubList bookClubs={bookClubs} />
    </Container>
  );
}

export default HomePage;
