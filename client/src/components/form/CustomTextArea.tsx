import { useField } from "formik";
import { Form, Header, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

export default function CustomTextArea(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <Header content={props.label} sub color="blue" />
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
