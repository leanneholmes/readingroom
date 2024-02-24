import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import "./style/style.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes.tsx";
import { StoreContext, store } from "./stores/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
