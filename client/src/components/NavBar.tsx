import { Menu, MenuMenu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu pointing secondary fixed="top">
      <MenuMenu position="left">
        <Menu.Item header>Reading Room</Menu.Item>
      </MenuMenu>
      <Menu.Item name="Browse for Book Clubs"></Menu.Item>
      <Menu.Item name="Create a Club"></Menu.Item>
      <Menu.Item name="My Clubs"></Menu.Item>
      <MenuMenu position="right">
        <Menu.Item name="Logout"></Menu.Item>
      </MenuMenu>
    </Menu>
  );
}
