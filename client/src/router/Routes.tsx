import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import MyClubs from "../pages/MyClubs";
import BookClubDetails from "../pages/BookClubDetails";
import BookClubForm from "../pages/BookClubForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", index: true, element: <HomePage /> },
      { path: "/create", element: <BookClubForm /> },
      { path: "/myclubs", element: <MyClubs /> },
      { path: "/bookclub/:id", element: <BookClubDetails /> },
      { path: "/edit/:id", element: <BookClubForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
