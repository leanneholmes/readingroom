import {
  Grid,
  Image,
  Item,
  Button,
  GridRow,
  GridColumn,
  Header,
} from "semantic-ui-react";
import { BookClub } from "../models/bookclub";

interface Props {
  bookClubs: BookClub[];
}

export default function BookClubList({ bookClubs }: Props) {
  return (
    <Grid divided="vertically">
      {bookClubs.map((bookclub) => (
        <GridRow>
          <GridColumn width={3}>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/image.png"
              style={{ width: "200px" }}
            />
          </GridColumn>
          <GridColumn width={13}>
            <Item>
              <Item.Content>
                <Item.Header>
                  <Header size="medium">{bookclub.name}</Header>
                </Item.Header>
                <Item.Description>{bookclub.description}</Item.Description>
                <Item.Extra style={{ marginTop: "60px" }}>
                  <Button
                    floated="left"
                    content={bookclub.category}
                    color="green"
                  />
                  <Button
                    floated="left"
                    content={bookclub.readingPace}
                    color="purple"
                  />
                  <Button floated="right" content="View Club" color="blue" />
                </Item.Extra>
              </Item.Content>
            </Item>
          </GridColumn>
        </GridRow>
      ))}
    </Grid>
  );
}
