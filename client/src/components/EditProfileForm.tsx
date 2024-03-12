import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import CustomTextInput from "./form/CustomTextInput";
import CustomTextArea from "./form/CustomTextArea";
import { useStore } from "../stores/store";
interface Props {
  setEditMode: (editMode: boolean) => void;
}
export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form" placeholder={undefined}>
          <CustomTextInput
            placeholder="Display Name"
            name="displayName"
            id="displayName"
          />
          <CustomTextArea
            rows={3}
            placeholder="Add your bio"
            name="bio"
            id="bio"
          />
          <Button
            positive
            className="btn-dark-green"
            type="submit"
            loading={isSubmitting}
            content="Save Changes"
            floated="left"
            id="submit"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
});
