import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { BookClub } from "./models/bookclub";
import NavBar from "./components/NavBar";
import BookClubList from "./components/BookClubList";
import agent from "./utils/agent";
import CreateBookClub from "./pages/CreateBookClub";

function App() {
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
    <>
      <NavBar />
      <Container style={{ marginTop: "6em" }}>
        <BookClubList bookClubs={bookClubs} />
        <CreateBookClub />
      </Container>
    </>
  );
}

export default App;
