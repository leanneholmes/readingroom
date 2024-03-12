import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { BookClubFormValues } from "../models/bookclub";
import LoadingComponent from "../components/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../components/form/CustomTextInput";
import CustomTextArea from "../components/form/CustomTextArea";
import CustomSelectInput from "../components/form/CustomSelectInput";
import { categoryOptions } from "../options/CategoryOptions";
import { readingPaceOptions } from "../options/ReadingPaceOptions";
import CustomDateInput from "../components/form/CustomDateInput";

export default observer(function CreateBookClub() {
  const { bookClubStore } = useStore();
  const { createBookClub, updateBookClub, loadBookClub, loadingInitial } =
    bookClubStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookClub, setBookClub] = useState<BookClubFormValues>(
    new BookClubFormValues()
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("The book club name is required"),
    description: Yup.string().required("The book club description is required"),
    category: Yup.string().required("Club genre is required"),
    readingPace: Yup.string().required("Reading pace is required"),
    nextMeeting: Yup.string().required("Meeting date is required").nullable(),
    meetingLink: Yup.string().required("A meeting link is required"),
    currentBook: Yup.string().required("Current book is required"),
    currentBookAuthor: Yup.string().required("Book author is required"),
  });

  useEffect(() => {
    if (id)
      loadBookClub(id).then((bookClub) =>
        setBookClub(new BookClubFormValues(bookClub))
      );
  }, [id, loadBookClub]);

  function handleFormSubmit(bookClub: BookClubFormValues) {
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

  if (loadingInitial)
    return <LoadingComponent content="Loading book club..." />;

  return (
    <>
      {bookClub.id ? (
        <Header as="h1" className="playfair">
          Edit Book Club
        </Header>
      ) : (
        <Header as="h1" className="playfair">
          Create a Book Club
        </Header>
      )}
      <Segment clearing style={{ marginTop: "20px" }}>
        <Formik
          validationSchema={validationSchema}
          enableReinitialize
          initialValues={bookClub}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form
              className="ui form"
              onSubmit={handleSubmit}
              autoComplete="off"
              placeholder={undefined}
            >
              <CustomTextInput
                name="name"
                placeholder="Name"
                label="Book Club Name"
                id="name"
              />
              <CustomTextArea
                rows={3}
                name="description"
                placeholder="Description"
                label="Club Description"
                id="description"
              />

              <CustomSelectInput
                options={categoryOptions}
                placeholder="Genre"
                name="category"
                label="Genre"
                id="category"
              />
              <CustomSelectInput
                options={readingPaceOptions}
                placeholder="Reading Pace"
                name="readingPace"
                label="Reading Pace"
                id="readingPace"
              />
              <Header
                as="h4"
                content="Next Meeting Date"
                className="form-label"
              />
              <CustomDateInput
                placeholderText="Next Meeting Date"
                name="nextMeeting"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM dd, yyyy - h:mm aa"
                minDate={new Date()}
                id="nextMeeting"
              />
              <CustomTextInput
                placeholder="Meeting Link"
                name="meetingLink"
                label="Meeting Link"
                id="meetingLink"
              />
              <CustomTextInput
                placeholder="Current Book"
                name="currentBook"
                label="Current Book"
                id="currentBook"
              />
              <CustomTextInput
                placeholder="Book Author"
                name="currentBookAuthor"
                label="Book Author"
                id="bookAuthor"
              />
              {bookClub.id ? (
                <>
                  <Button
                    disabled={isSubmitting || !dirty || !isValid}
                    loading={isSubmitting}
                    floated="right"
                    positive
                    className="btn-dark-green"
                    type="submit"
                    content="Submit"
                    id="submit"
                  />
                  <Button
                    floated="right"
                    color="grey"
                    content="Cancel"
                    onClick={handleCancel}
                    id="cancel"
                  />
                </>
              ) : (
                <>
                  <Button
                    disabled={isSubmitting || !dirty || !isValid}
                    loading={isSubmitting}
                    floated="right"
                    positive
                    type="submit"
                    className="btn-dark-green"
                    content="Create"
                    id="create"
                  />
                </>
              )}
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
});
