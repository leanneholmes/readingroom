import { observer } from "mobx-react-lite";
import { Image, Header, Grid, GridRow, GridColumn } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BookClub } from "../models/bookclub";

interface Props {
  bookClub: BookClub;
}

export default observer(function BookClubMemberList({
  bookClub: { members, owner },
}: Props) {
  if (!members) return null;
  return (
    <>
      <Header as="h4" style={{ marginTop: "15px" }}>
        Member List
      </Header>
      <Grid>
        {members.map((member) => (
          <GridRow
            key={member.username}
            verticalAlign="middle"
            style={{ padding: "7px 0px" }}
          >
            <GridColumn width={4}>
              <Image circular src={member.image || "/assets/user.png"} />
            </GridColumn>
            <GridColumn width={12} style={{ padding: "2px" }}>
              <Header as="h4">
                <Link
                  to={`/profiles/${member.username}`}
                  style={{ color: "#384776" }}
                >
                  {member.displayName}{" "}
                  {member.username === owner?.username && "(Club Owner)"}
                </Link>
              </Header>
            </GridColumn>
          </GridRow>
        ))}
      </Grid>
    </>
  );
});
