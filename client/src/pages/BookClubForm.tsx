import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { BookClub } from "../models/bookclub";
import LoadingComponent from "../components/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field } from "formik";

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

  // function handleSubmit() {
  //   if (!bookClub.id) {
  //     bookClub.id = uuid();
  //     createBookClub(bookClub).then(() => navigate(`/bookclub/${bookClub.id}`));
  //   } else {
  //     updateBookClub(bookClub).then(() => navigate(`/bookclub/${bookClub.id}`));
  //   }
  // }

  function handleCancel() {
    navigate(`/bookclub/${bookClub.id}`);
  }

  // function handleChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = event.target;
  //   setBookClub({ ...bookClub, [name]: value });
  // }

  if (loadingInitial)
    return <LoadingComponent content="Loading book club..." />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={bookClub}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off" placeholder={undefined}>
            <Header content="Book Club Name" sub color="blue" />
            <Field
              placeholder="Name"
              name="name"
            />
            <Header content="Description" sub color="blue" />
            <Field
              placeholder="Description"
              name="description"
            />
            <Header content="Category" sub color="blue" />
            <Field
              placeholder="Category"
              name="category"
            />
            <Header content="Reading Pace" sub color="blue" />
            <Field
              placeholder="Reading Pace"
              name="readingPace"
            />
            <Header content="Next Meeting Date" sub color="blue" />
            <Field
              type="date"
              placeholder="Next Meeting Date"
              name="nextMeeting"
            />
            <Header content="Meeting Link" sub color="blue" />
            <Field
              placeholder="Meeting Link"
              name="meetingLink"
            />
            <Header content="Current Book" sub color="blue" />
            <Field
              placeholder="Current Book"
              name="currentBook"
            />
            <Header content="Book Author" sub color="blue" />
            <Field
              placeholder="Book Author"
              name="currentBookAuthor"
            />
            {bookClub.id ? (
              <>
                <Button
                  loading={loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
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
                />
              </>
            )}
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
