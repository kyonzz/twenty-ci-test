import * as React from "react";
import { ChakraProvider, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import AuthProvider from "./hooks/auth";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Router>
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher
            w="40px"
            h="40px"
            position="absolute"
            top="10px"
            right="10px"
          />
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/">
              <Switch>
                <Route exact path="/">
                  <p>osts</p>
                </Route>
              </Switch>
            </PrivateRoute>
          </Switch>
        </Grid>
      </Router>
    </AuthProvider>
  </ChakraProvider>
);
