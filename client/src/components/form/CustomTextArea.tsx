import { useField } from "formik";
import { Form, Header, Label } from "semantic-ui-react";

interface Props {
  placeholder?: string;
  name: string;
  rows: number;
  label?: string;
  id?: string;
}

export default function CustomTextArea(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <Header as="h4" content={props.label} className="form-label" />
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
