import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import MyClubs from "../pages/MyClubs";
import BookClubDetails from "../pages/BookClubDetails";
import BookClubForm from "../pages/BookClubForm";
import BookClubs from "../pages/BookClubs";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/bookclubs", index: true, element: <BookClubs /> },
      { path: "/create", element: <BookClubForm key="create" /> },
      { path: "/myclubs", element: <MyClubs /> },
      { path: "/bookclubs/:id", element: <BookClubDetails /> },
      { path: "/edit/:id", element: <BookClubForm key="edit" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
