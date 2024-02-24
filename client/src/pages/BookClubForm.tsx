import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { BookClub } from "../models/bookclub";
import LoadingComponent from "../components/LoadingComponent";
import { v4 as uuid } from "uuid";

export default observer(function CreateBookClub() {
  const { bookClubStore } = useStore();
  const {
    createBookClub,
    updateBookClub,
    loading,
    loadBookClub,
    loadingInitial,
  } = bookClubStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookClub, setBookClub] = useState<BookClub>({
    id: "",
    name: "",
    description: "",
    category: "",
    readingPace: "",
    nextMeeting: "",
    meetingLink: "",
    currentBook: "",
    currentBookAuthor: "",
  });

  useEffect(() => {
    if (id) loadBookClub(id).then((bookClub) => setBookClub(bookClub!));
  }, [id, loadBookClub]);

  function handleSubmit() {
    if (!bookClub.id) {
      bookClub.id = uuid();
      createBookClub(bookClub).then(() => navigate(`/bookclub/${bookClub.id}`));
    } else {
      updateBookClub(bookClub).then(() => navigate(`/bookclub/${bookClub.id}`));
    }
  }

  function handleCancel() {
    navigate(`/bookclub/${bookClub.id}`);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setBookClub({ ...bookClub, [name]: value });
  }

  if (loadingInitial)
    return <LoadingComponent content="Loading book club..." />;

  return (
    <Segment clearing>
      <Form>
        <Header content="Book Club Name" sub color="blue" />
        <Form.Input
          placeholder="Name"
          name="name"
          value={bookClub.name}
          onChange={handleInputChange}
        />
        <Header content="Description" sub color="blue" />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={bookClub.description}
          onChange={handleInputChange}
        />
        <Header content="Category" sub color="blue" />
        <Form.Input
          placeholder="Category"
          name="category"
          value={bookClub.category}
          onChange={handleInputChange}
        />
        <Header content="Reading Pace" sub color="blue" />
        <Form.Input
          placeholder="Reading Pace"
          name="readingPace"
          value={bookClub.readingPace}
          onChange={handleInputChange}
        />
        <Header content="Next Meeting Date" sub color="blue" />
        <Form.Input
          type="date"
          placeholder="Next Meeting Date"
          name="nextMeeting"
          value={bookClub.nextMeeting}
          onChange={handleInputChange}
        />
        <Header content="Meeting Link" sub color="blue" />
        <Form.Input
          placeholder="Meeting Link"
          name="meetingLink"
          value={bookClub.meetingLink}
          onChange={handleInputChange}
        />
        <Header content="Current Book" sub color="blue" />
        <Form.Input
          placeholder="Current Book"
          name="currentBook"
          value={bookClub.currentBook}
          onChange={handleInputChange}
        />
        <Header content="Book Author" sub color="blue" />
        <Form.Input
          placeholder="Book Author"
          name="currentBookAuthor"
          value={bookClub.currentBookAuthor}
          onChange={handleInputChange}
        />
        {bookClub.id ? (
          <>
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
              onClick={handleSubmit}
            />
            <Button
              floated="right"
              color="grey"
              content="Cancel"
              onClick={handleCancel}
            />
          </>
        ) : (
          <>
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Create"
              onClick={handleSubmit}
            />
          </>
        )}
      </Form>
    </Segment>
  );
});
