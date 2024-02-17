import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";

export default observer(function MyClubs() {
  return (
    <Container style={{ marginTop: "6em" }}>
      <h1>My Clubs</h1>
    </Container>
  );
});
