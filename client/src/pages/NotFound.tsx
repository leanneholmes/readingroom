import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Container textAlign="center">
      <Header icon>
        <Icon name="search" />
        Oops, that page cannot be found!
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/bookclubs">
          Return to Book Clubs
        </Button>
      </Segment.Inline>
    </Container>
  );
}
