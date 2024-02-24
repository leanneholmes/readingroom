import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import MyClubs from "../pages/MyClubs";
import BookClubDetails from "../pages/BookClubDetails";
import BookClubForm from "../pages/BookClubForm";
import BookClubs from "../pages/BookClubs";
import TestErrors from "../components/TestErrors";
import NotFound from "../pages/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/bookclubs", index: true, element: <BookClubs /> },
      { path: "/create", element: <BookClubForm key="create" /> },
      { path: "/myclubs", element: <MyClubs /> },
      { path: "/bookclub/:id", element: <BookClubDetails /> },
      { path: "/edit/:id", element: <BookClubForm key="edit" /> },
      { path: "/errors", element: <TestErrors /> },
      { path: "/not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> }, //Any bad URL will redirect to not found
    ],
  },
];

export const router = createBrowserRouter(routes);
