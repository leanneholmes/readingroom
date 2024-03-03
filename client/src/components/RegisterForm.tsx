import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import * as Yup from "yup";
import CustomTextInput from "./form/CustomTextInput";
import { useStore } from "../stores/store";
import ValidationError from "./errors/ValidationError";

export default observer(function RegsiterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
          placeholder={undefined}
        >
          <Header as="h2">Register Form</Header>
          <CustomTextInput placeholder="Display Name" name="displayName" />
          <CustomTextInput placeholder="Username" name="username" />
          <CustomTextInput placeholder="Email" name="email" />
          <CustomTextInput
            placeholder="Password"
            name="password"
            type="password"
          />
          <ErrorMessage
            name="error"
            render={() => (
              <ValidationError errors={errors.error as unknown as string[]} />
            )}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
