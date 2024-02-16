import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import BookClubList from "../components/BookClubList";
import LoadingComponent from "../components/LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function HomePage() {
  const { bookClubStore } = useStore();

  useEffect(() => {
    bookClubStore.loadBookClubs();
  }, [bookClubStore]);

  if (bookClubStore.loadingInitial) return <LoadingComponent />;
  return (
    <Container style={{ marginTop: "6em" }}>
      <h1>Homepage</h1>
      <BookClubList bookClubs={bookClubStore.bookClubs} />
    </Container>
  );
}

export default observer(HomePage);
