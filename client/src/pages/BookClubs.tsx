import { SyntheticEvent, useEffect, useState } from "react";
import {
  Button,
  Container,
  Header,
  Pagination,
  Select,
} from "semantic-ui-react";
import BookClubList from "../components/BookClubList";
import LoadingComponent from "../components/LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { PagingParams } from "../models/pagination";
import { categoryOptions } from "../options/CategoryOptions";
import { readingPaceOptions } from "../options/ReadingPaceOptions";

function BookClubs(this: any) {
  const { bookClubStore } = useStore();
  const {
    bookClubsAsMap,
    loadBookClubs,
    setPagingParams,
    pagination,
    predicate,
    setPredicate,
  } = bookClubStore;
  const [activePage, setActivePage] = useState(1);

  function handlePageChange(_event: SyntheticEvent<HTMLElement>, data: any) {
    setActivePage(data.activePage);
    setPagingParams(new PagingParams(data.activePage));
    loadBookClubs();
  }

  function handleReset() {
    setPredicate("all", "true");
  }

  function handleCategoryChange(
    _event: SyntheticEvent<HTMLElement>,
    data: any
  ) {
    const selectedCategory = data.value;
    setPredicate("Category", selectedCategory);
  }

  function handleReadingPaceChange(
    _event: SyntheticEvent<HTMLElement>,
    data: any
  ) {
    const selectedReadingPace = data.value;
    setPredicate("ReadingPace", selectedReadingPace);
  }

  useEffect(() => {
    setPredicate("all", "true");
    loadBookClubs();
  }, [loadBookClubs]);

  if (bookClubStore.loadingInitial) return <LoadingComponent />;
  return (
    <Container style={{ marginTop: "6em", paddingBottom: "3em" }}>
      <Header as="h1" className="playfair" style={{ marginBottom: "30px" }}>
        All Book Clubs
      </Header>
      <Container style={{ marginBottom: "20px" }}>
        <Select
          options={categoryOptions}
          value={predicate.get("Category") || ""}
          onChange={handleCategoryChange}
          placeholder="Filter by Genre"
          name="category"
          style={{ backgroundColor: "#f3f4f6", borderColor: "#f3f4f6" }}
        />
        <Select
          options={readingPaceOptions}
          placeholder="Filter by Pace"
          name="readingPace"
          value={predicate.get("ReadingPace") || ""}
          onChange={handleReadingPaceChange}
          style={{
            backgroundColor: "#f3f4f6",
            borderColor: "#f3f4f6",
            marginLeft: "10px",
          }}
        />
        <Button
          color="black"
          className="btn-dark-blue"
          content="Reset Filters"
          style={{ marginLeft: "10px" }}
          onClick={handleReset}
        />
      </Container>
      <BookClubList bookClubs={bookClubsAsMap} />
      <div className="pagination">
        {pagination && (
          <Pagination
            activePage={activePage}
            boundaryRange={0}
            defaultActivePage={1}
            siblingRange={1}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Container>
  );
}

export default observer(BookClubs);
