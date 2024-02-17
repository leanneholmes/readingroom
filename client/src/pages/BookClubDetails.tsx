import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoadingComponent from "../components/LoadingComponent";
import { useParams } from "react-router";
import { useEffect } from "react";

export default observer(function BookClubDetails() {
  const { bookClubStore } = useStore();
  const {
    selectedBookClub: bookClub,
    loadBookClub,
    loadingInitial,
  } = bookClubStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadBookClub(id);
  }, [id, loadBookClub]);

  if (loadingInitial || !bookClub) return <LoadingComponent />;

  return (
    <Container style={{ marginTop: "6em" }}>
      <h1>View Book Club</h1>
      <h3>{bookClub.name}</h3>
      <div>Description: {bookClub.description}</div>
      <div>Category: {bookClub.category}</div>
      <div>Reading Pace: {bookClub.readingPace}</div>
      <div>
        Current Book: {bookClub.currentBook} by {bookClub.currentBookAuthor}{" "}
      </div>
    </Container>
  );
});
