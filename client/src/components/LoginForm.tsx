import { ErrorMessage, Form, Formik } from "formik";
import CustomTextInput from "./form/CustomTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
  const { userStore } = useStore();
  return (
    <>
      <Header as="h2">Login Form</Header>
      <Formik
        initialValues={{ email: "", password: "", error: null }}
        onSubmit={(values, { setErrors }) =>
          userStore
            .login(values)
            .catch((error) => setErrors({ error: "Invalid email or password" }))
        }
      >
        {({ handleSubmit, isSubmitting, errors }) => (
          <Form
            className="ui form"
            onSubmit={handleSubmit}
            autoComplete="off"
            placeholder={undefined}
          >
            <CustomTextInput
              placeholder="Email"
              name="email"
              label="Email Address"
            />
            <CustomTextInput
              placeholder="Password"
              name="password"
              label="Password"
              type="password"
            />
            <ErrorMessage
              name="error"
              render={() => (
                <Label
                  style={{ marginBottom: 10 }}
                  basic
                  color="red"
                  content={errors.error}
                />
              )}
            />
            <Button
              loading={isSubmitting}
              positive
              content="Login"
              type="submit"
              fluid
            />
          </Form>
        )}
      </Formik>
    </>
  );
});
