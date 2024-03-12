import {
  Container,
  Divider,
  Grid,
  GridColumn,
  GridRow,
  Header,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { useStore } from "../stores/store";

function HomePage() {
  const { userStore } = useStore();
  const { isLoggedIn } = userStore;
  const [loginForm, setLoginForm] = useState(true);

  function handleClick() {
    setLoginForm((loginForm) => !loginForm!);
    console.log(loginForm);
  }

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/bookclubs" />
      ) : (
        <div>
          <Container
            style={{
              marginTop: "6em",
              paddingRight: "8em",
              paddingLeft: "8em",
            }}
            textAlign="center"
          >
            <Grid celled style={{ borderRadius: "10px" }}>
              <GridRow style={{ borderRadius: "10px" }}>
                <GridColumn
                  width={9}
                  style={{
                    marginTop: "7em",
                    marginBottom: "7em",
                  }}
                >
                  <Header
                    as="h1"
                    className="playfair"
                    style={{ marginBottom: "25px" }}
                  >
                    Welcome to Reading Room
                  </Header>
                  <Divider
                    style={{
                      width: "50%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <Container
                    style={{
                      width: "70%",
                      marginTop: "2em",
                      marginBottom: "2em",
                      height: "20em",
                    }}
                    textAlign="left"
                  >
                    {loginForm ? (
                      <>
                        <LoginForm />
                        <Container
                          textAlign="center"
                          style={{ marginTop: "1em" }}
                        >
                          Don't have an account?{" "}
                          <Link onClick={handleClick} to={""}>
                            Click here
                          </Link>{" "}
                          to register
                        </Container>
                      </>
                    ) : (
                      <>
                        <RegisterForm />
                        <Container
                          textAlign="center"
                          style={{ marginTop: "1em" }}
                        >
                          Already have an account?{" "}
                          <Link onClick={handleClick} to={""}>
                            Click here
                          </Link>{" "}
                          to login
                        </Container>
                      </>
                    )}
                  </Container>
                </GridColumn>
                <GridColumn width={7} className="login-image"></GridColumn>
              </GridRow>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
}

export default observer(HomePage);
