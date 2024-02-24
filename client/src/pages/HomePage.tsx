import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container style={{ marginTop: "6em" }}>
      <h1>Welcome to the Reading Room</h1>
      <h3>
        Go to <Link to="/bookclubs">Book Clubs</Link>
      </h3>
    </Container>
  );
}

export default observer(HomePage);
