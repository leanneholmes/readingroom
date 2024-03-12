import {
  Grid,
  Image,
  Item,
  Button,
  GridRow,
  GridColumn,
  Header,
  Label,
  Icon,
  Segment,
} from "semantic-ui-react";
import { BookClub } from "../models/bookclub";
import { Link } from "react-router-dom";

interface Props {
  bookClubs: BookClub[];
}

export default function BookClubList({ bookClubs }: Props) {
  if (bookClubs.length < 1) return <>There are no results to display.</>;
  return (
    <>
      {bookClubs.map((bookclub) => (
        <Segment style={{ marginBottom: "25px" }} key={bookclub.id}>
          <Grid>
            <GridRow key={bookclub.id} stretched style={{ fontSize: "1.05em" }}>
              <GridColumn width={4}>
                <Image src={`/assets/${bookclub.category}.png`} />
              </GridColumn>
              <GridColumn width={12}>
                <GridRow style={{ height: "30%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Header size="large">{bookclub.name}</Header>
                      {bookclub.members?.length}{" "}
                      {bookclub.members?.length === 1 ? "Member" : "Members"}
                    </div>
                    <div style={{ float: "right" }}>
                      <Button
                        as={Link}
                        to={`/bookclub/${bookclub.id}`}
                        floated="right"
                        icon
                      >
                        View Club <Icon name="chevron right" />
                      </Button>
                    </div>
                  </div>
                </GridRow>
                <GridRow style={{ height: "50%", marginTop: "10px" }}>
                  {bookclub.description}
                  {bookclub.isOwner && (
                    <div style={{ marginTop: "8px" }}>
                      <Item.Description>
                        <Label
                          basic
                          color="green"
                          style={{ fontSize: "0.9em" }}
                        >
                          You are the owner of this club
                        </Label>
                      </Item.Description>
                    </div>
                  )}
                  {bookclub.isMember && !bookclub.isOwner && (
                    <div style={{ marginTop: "8px" }}>
                      <Item.Description>
                        <Label
                          basic
                          color="orange"
                          style={{ fontSize: "0.9em" }}
                        >
                          You are a member of this club
                        </Label>
                      </Item.Description>
                    </div>
                  )}
                </GridRow>
                <GridRow style={{ height: "20%", marginTop: "10px" }}>
                  <Label
                    size="large"
                    as="a"
                    style={{ backgroundColor: "#06282d", color: "#fff" }}
                  >
                    <Icon name="book" />
                    {bookclub.category}
                  </Label>
                  <Label
                    size="large"
                    as="a"
                    style={{ backgroundColor: "#0f0f0f", color: "#fff" }}
                  >
                    <Icon name="time" />
                    {bookclub.readingPace} Pace
                  </Label>
                </GridRow>
              </GridColumn>
            </GridRow>
          </Grid>
        </Segment>
      ))}
    </>
  );
}
