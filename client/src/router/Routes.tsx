import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import CreateBookClub from "../pages/CreateBookClub";
import MyClubs from "../pages/MyClubs";
import BookClubDetails from "../pages/BookClubDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", index: true, element: <HomePage /> },
      { path: "/create", element: <CreateBookClub /> },
      { path: "/myclubs", element: <MyClubs /> },
      { path: "/bookclub/:id", element: <BookClubDetails /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
