import React from "react";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./style/style.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes.tsx";
import { StoreContext, store } from "./stores/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
