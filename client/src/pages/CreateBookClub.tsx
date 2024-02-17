import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function CreateBookClub() {
  const { bookClubStore } = useStore();
  const { createBookClub, loading } = bookClubStore;

  const initialState = {
    id: "",
    name: "",
    description: "",
    category: "",
    readingPace: "",
    nextMeeting: "",
    meetingLink: "",
    currentBook: "",
    currentBookAuthor: "",
  };

  const [bookClub, setBookClub] = useState(initialState);

  function handleSubmit() {
    createBookClub(bookClub);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setBookClub({ ...bookClub, [name]: value });
  }
  return (
    <Segment clearing>
      <Form>
        <Form.Input
          placeholder="Name"
          name="name"
          value={bookClub.name}
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          value={bookClub.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          value={bookClub.category}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Reading Pace"
          name="readingPace"
          value={bookClub.readingPace}
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Next Meeting Date"
          name="nextMeeting"
          value={bookClub.nextMeeting}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Meeting Link"
          name="meetingLink"
          value={bookClub.meetingLink}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Current Book"
          name="currentBook"
          value={bookClub.currentBook}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Book Author"
          name="currentBookAuthor"
          value={bookClub.currentBookAuthor}
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Create"
          onClick={handleSubmit}
        />
      </Form>
    </Segment>
  );
});
