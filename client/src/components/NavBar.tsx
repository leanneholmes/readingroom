import { NavLink } from "react-router-dom";
import { Menu, MenuMenu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu pointing secondary fixed="top">
      <MenuMenu position="left">
        <Menu.Item header>Reading Room</Menu.Item>
      </MenuMenu>
      <Menu.Item as={NavLink} to="/" name="Browse for Book Clubs"></Menu.Item>
      <Menu.Item as={NavLink} to="/create" name="Create a Club"></Menu.Item>
      <Menu.Item as={NavLink} to="/myclubs" name="My Clubs"></Menu.Item>
      <MenuMenu position="right">
        <Menu.Item name="Logout"></Menu.Item>
      </MenuMenu>
    </Menu>
  );
}
