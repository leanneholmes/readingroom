import { Link, NavLink } from "react-router-dom";
import { Dropdown, Image, Menu, MenuMenu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu pointing secondary fixed="top">
      <MenuMenu position="left">
        <Menu.Item header>Reading Room</Menu.Item>
      </MenuMenu>
      <Menu.Item
        as={NavLink}
        to="/bookclubs"
        name="View Book Clubs"
      ></Menu.Item>
      <Menu.Item as={NavLink} to="/create" name="Create a Club"></Menu.Item>
      {/* <Menu.Item
        as={NavLink}
        to="/errors"
        name="Test Client Errors"
      ></Menu.Item> */}
      <MenuMenu position="right">
        <Image src={user?.image || "/assets/user.png"} avatar spaced="right" />
        <Dropdown pointing="top left" text={user?.username}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/profile/${user?.username}`}
              text="My Profile"
              icon="user"
            />
            <Dropdown.Item onClick={logout} text="Logout" icon="power" />
          </Dropdown.Menu>
        </Dropdown>
      </MenuMenu>
    </Menu>
  );
});
