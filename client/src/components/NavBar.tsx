import { Link, NavLink } from "react-router-dom";
import { Dropdown, Image, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
  return (
    <Menu
      pointing
      secondary
      fixed="top"
      style={{ fontSize: "12pt", height: "40px" }}
      inverted
      className="navbar"
    >
      <MenuMenu position="left" style={{ position: "relative", top: "2px" }}>
        <Menu.Item header>Reading Room</Menu.Item>
      </MenuMenu>
      <Menu.Item
        as={NavLink}
        to="/bookclubs"
        name="View Book Clubs"
        id="bookclubs"
      ></Menu.Item>
      <Menu.Item
        as={NavLink}
        to="/create"
        name="Create a Club"
        id="create"
      ></Menu.Item>
      <MenuMenu position="right">
        <MenuItem style={{ position: "relative", top: "7px" }}>
          <Image
            src={user?.image || "/assets/user.png"}
            avatar
            spaced="right"
          />
          <Dropdown pointing="top left" text={user?.username}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profiles/${user?.username}`}
                text="My Profile"
                icon="user"
                id="profile"
              />
              <Dropdown.Item
                onClick={logout}
                text="Logout"
                icon="log out"
                id="logout"
              />
            </Dropdown.Menu>
          </Dropdown>
        </MenuItem>
      </MenuMenu>
    </Menu>
  );
});
