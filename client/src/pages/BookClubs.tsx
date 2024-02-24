import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import BookClubList from "../components/BookClubList";
import LoadingComponent from "../components/LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function BookClubs() {
  const { bookClubStore } = useStore();
  const { bookClubsAsMap } = bookClubStore;
  const { loadBookClubs, bookClubRegistry } = bookClubStore;

  useEffect(() => {
    loadBookClubs();
    // if (bookClubRegistry.size === 0) loadBookClubs();
  }, [loadBookClubs]);

  if (bookClubStore.loadingInitial) return <LoadingComponent />;
  return (
    <Container style={{ marginTop: "6em" }}>
      <h1>Book Clubs</h1>
      <BookClubList bookClubs={bookClubsAsMap} />
    </Container>
  );
}

export default observer(BookClubs);
