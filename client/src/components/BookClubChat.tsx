import { observer } from "mobx-react-lite";
import { Segment, Header, Comment, Button, Loader } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import CustomTextArea from "./form/CustomTextArea";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";

interface Props {
  bookClubId: string;
}

export default observer(function BookClubChat({ bookClubId }: Props) {
  const { commentStore } = useStore();

  useEffect(() => {
    if (bookClubId) {
      commentStore.createHubConnection(bookClubId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, bookClubId]);

  return (
    <div style={{ width: "80%", marginTop: "20px" }}>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Header as="h4">Club Message Board</Header>
      </Segment>
      <Segment attached clearing style={{ marginBottom: "20px" }}>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id} style={{ marginBottom: "10px" }}>
              <Comment.Avatar src={comment.avatar || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

          <Formik
            onSubmit={(values, { resetForm }) =>
              commentStore.addComment(values).then(() => resetForm())
            }
            initialValues={{ body: "" }}
            validationSchema={Yup.object({ body: Yup.string().required() })}
          >
            {({ isSubmitting, isValid, handleSubmit }) => (
              <Form className="ui form" placeholder={undefined}>
                <Field name="body">
                  {(props: FieldProps) => (
                    <div style={{ position: "relative" }}>
                      <Loader active={isSubmitting} />
                      <textarea
                        placeholder="Write your message (Hit enter to submit)"
                        rows={2}
                        {...props.field}
                        onKeyDown={(e) => {
                          if (e.key == "Enter" && e.shiftKey) {
                            return;
                          }
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            isValid && handleSubmit();
                          }
                        }}
                      />
                    </div>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
        </Comment.Group>
      </Segment>
    </div>
  );
});
