import { Form, Formik } from "formik";
import CustomTextInput from "./form/CustomTextInput";
import { Button, Header } from "semantic-ui-react";

export default function RegisterForm() {
  return (
    <>
      <Header as="h2">Register Form</Header>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
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
            <Button positive content="Register" type="submit" fluid />
          </Form>
        )}
      </Formik>
    </>
  );
}
