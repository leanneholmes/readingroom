import { Container } from "semantic-ui-react";
import NavBar from "./components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "6em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
