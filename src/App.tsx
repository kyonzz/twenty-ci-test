import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
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
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/">
            <Switch>
              <Route exact path="/">
                <p>osts</p>
                {/* <LoginPage /> */}
              </Route>
            </Switch>
          </PrivateRoute>
        </Switch>
        {/* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box> */}
      </Router>
    </AuthProvider>
  </ChakraProvider>
);
