import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Header, Card, Image, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/store";
import { UserBookClub } from "../models/profile";

interface Props {
  username?: string;
}

export default observer(function ProfileBookClubs({ username }: Props) {
  const { profileStore } = useStore();
  const { loadUserBookClubs, loadingBookClubs, userBookClubs } = profileStore;

  useEffect(() => {
    if (username) loadUserBookClubs(username);
  }, [loadUserBookClubs, username]);

  if (loadingBookClubs) return <Loader />;

  if (userBookClubs.length < 1)
    return (
      <Grid>
        <Grid.Column width={16}>
          <Header as="h2">Book Clubs</Header>
          This user is not a member of any book clubs.
        </Grid.Column>
      </Grid>
    );

  return (
    <Grid style={{ marginBottom: "30px" }}>
      <Grid.Column width={16}>
        <Header as="h2">Book Clubs</Header>
        <Card.Group itemsPerRow={4}>
          {userBookClubs.map((bookClub: UserBookClub) => (
            <Card
              as={Link}
              to={`/bookclub/${bookClub.id}`}
              key={bookClub.id}
              style={{ minWidth: 250 }}
            >
              <Image
                src={`/assets/${bookClub.category}.png`}
                style={{ minHeight: 100, objectFit: "cover" }}
              />
              <Card.Content>
                <Card.Header textAlign="center">{bookClub.name}</Card.Header>
                <Card.Meta textAlign="center">
                  <div>Genre: {bookClub.category}</div>
                  <div>Reading Pace: {bookClub.readingPace}</div>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
});
