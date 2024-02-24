import { NavLink } from "react-router-dom";
import { Menu, MenuMenu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
  const { bookClubStore } = useStore();
  return (
    <Menu pointing secondary fixed="top">
      <MenuMenu position="left">
        <Menu.Item header>Reading Room</Menu.Item>
      </MenuMenu>
      <Menu.Item as={NavLink} to="/" name="View Book Clubs"></Menu.Item>
      <Menu.Item as={NavLink} to="/create" name="Create a Club"></Menu.Item>
      <MenuMenu position="right">
        <Menu.Item name="Logout"></Menu.Item>
      </MenuMenu>
    </Menu>
  );
}
