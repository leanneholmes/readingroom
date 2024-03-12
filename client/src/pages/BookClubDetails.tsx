import { observer } from "mobx-react-lite";
import {
  Button,
  Container,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoadingComponent from "../components/LoadingComponent";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import BookClubMemberList from "../components/BookClubMemberList";
import BookClubChat from "../components/BookClubChat";

export default observer(function BookClubDetails() {
  const { bookClubStore } = useStore();
  const navigate = useNavigate();
  const {
    selectedBookClub: bookClub,
    loadBookClub,
    loadingInitial,
    deleteBookClub,
    updateMembership,
    loading,
    clearSelectedBookClub,
  } = bookClubStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) loadBookClub(id);
    return () => clearSelectedBookClub();
  }, [id, loadBookClub, clearSelectedBookClub]);

  function handleDelete() {
    if (confirm("Are you sure you want to delete this club?") == true) {
      deleteBookClub(bookClub!.id);
      navigate("/bookclubs");
    }
  }

  if (loadingInitial || !bookClub) return <LoadingComponent />;

  return (
    <Container style={{ marginTop: "6em" }}>
      <Header as="h1" className="playfair">
        View Book Club
      </Header>
      <Grid relaxed style={{ marginTop: "15px" }}>
        <GridRow>
          <GridColumn width={5}>
            <Image src={`/assets/${bookClub.category}.png`} />
            <BookClubMemberList bookClub={bookClub!} />
          </GridColumn>
          <GridColumn width={11}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Header
                  as="h2"
                  style={{ marginBottom: "3px", color: "#384776" }}
                >
                  {bookClub.name}
                </Header>
                <div>
                  Owned by{" "}
                  <Link
                    to={`/profiles/${bookClub.owner?.username}`}
                    style={{ color: "#384776" }}
                  >
                    <strong>{bookClub.owner?.displayName}</strong>
                  </Link>
                </div>
              </div>
              <div style={{ float: "right" }}>
                {bookClub.isOwner ? (
                  <>
                    <Button
                      as={Link}
                      to={`/edit/${bookClub.id}`}
                      color="black"
                      content="Edit"
                      className="btn-dark-blue"
                      id="edit"
                    />
                    <Button
                      onClick={handleDelete}
                      color="red"
                      content="Delete"
                      className="btn-dark-red"
                      id="delete"
                    />
                  </>
                ) : null}
                {bookClub.isMember && !bookClub.isOwner ? (
                  <>
                    <Button
                      loading={loading}
                      onClick={updateMembership}
                      color="red"
                      className="btn-dark-red"
                      content="Leave Club"
                      id="leave"
                    />
                  </>
                ) : null}
                {!bookClub.isMember && !bookClub.isOwner ? (
                  <>
                    <Button
                      loading={loading}
                      onClick={updateMembership}
                      color="blue"
                      content="Join Club"
                      className="btn-dark-blue"
                      id="join"
                    />
                  </>
                ) : null}
              </div>
            </div>
            <Header as="h4">Club Description</Header>
            {bookClub.description}
            <Header as="h4">Current Book</Header>
            {bookClub.currentBook} by {bookClub.currentBookAuthor}
            <Header as="h4">Next Meeting Date</Header>
            {format(bookClub.nextMeeting!, "MMMM dd, yyyy - h:mm aa")}
            <Header as="h4">Meeting Link</Header>
            <Link to={bookClub.meetingLink}>{bookClub.meetingLink}</Link>
            <div style={{ height: "22px" }}></div>
            <Label
              size="large"
              as="a"
              style={{ backgroundColor: "#06282d", color: "#fff" }}
            >
              <Icon name="book" />
              {bookClub.category}
            </Label>
            <Label size="large" color="black" as="a">
              <Icon name="time" />
              {bookClub.readingPace} Pace
            </Label>
            <BookClubChat bookClubId={bookClub.id} />
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
});
