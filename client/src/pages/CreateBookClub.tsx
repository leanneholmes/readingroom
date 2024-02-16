import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function CreateBookClub() {
  const [submitting, setSubmitting] = useState("false");
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Name" />
        <Form.TextArea placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="Reading Pace" />
        <Form.Input type="date" placeholder="Next Meeting Date" />
        <Form.Input placeholder="Meeting Link" />
        <Form.Input placeholder="Current Book" />
        <Form.Input placeholder="Book Author" />
        <Button floated="right" positive type="submit" content="Create" />
      </Form>
    </Segment>
  );
}
