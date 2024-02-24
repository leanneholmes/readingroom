import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { BookClub } from "../models/bookclub";
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
    nextMeeting: null,
    meetingLink: "",
    currentBook: "",
    currentBookAuthor: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("The book club name is required"),
    description: Yup.string().required("The book club description is required"),
    category: Yup.string().required("Club category is required"),
    readingPace: Yup.string().required("Reading pace is required"),
    nextMeeting: Yup.string().required("Meeting date is required").nullable(),
    meetingLink: Yup.string().required("A meeting link is required"),
    currentBook: Yup.string().required("Current book is required"),
    currentBookAuthor: Yup.string().required("Book author is required"),
  });

  useEffect(() => {
    if (id) loadBookClub(id).then((bookClub) => setBookClub(bookClub!));
  }, [id, loadBookClub]);

  function handleFormSubmit(bookClub: BookClub) {
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
    <Segment clearing>
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
            />
            <CustomTextArea
              rows={3}
              name="description"
              placeholder="Description"
              label="Club Description"
            />

            <CustomSelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
              label="Category"
            />
            <CustomSelectInput
              options={readingPaceOptions}
              placeholder="Reading Pace"
              name="readingPace"
              label="Reading Pace"
            />
            <Header content="Next Meeting Date" sub color="blue" />
            <CustomDateInput
              placeholderText="Next Meeting Date"
              name="nextMeeting"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM dd, yyyy - h:mm aa"
              minDate={new Date()}
            />
            <CustomTextInput
              placeholder="Meeting Link"
              name="meetingLink"
              label="Meeting Link"
            />
            <CustomTextInput
              placeholder="Current Book"
              name="currentBook"
              label="Current Book"
            />
            <CustomTextInput
              placeholder="Book Author"
              name="currentBookAuthor"
              label="Book Author"
            />
            {bookClub.id ? (
              <>
                <Button
                  disabled={isSubmitting || !dirty || !isValid}
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
                  disabled={isSubmitting || !dirty || !isValid}
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
