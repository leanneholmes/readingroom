import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import CreateBookClub from "../pages/CreateBookClub";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", index: true, element: <HomePage /> },
      { path: "/create", element: <CreateBookClub /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
