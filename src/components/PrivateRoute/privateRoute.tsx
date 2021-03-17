import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

interface IProps extends RouteProps {}

const PrivateRoute: React.FC<IProps> = ({ children, ...rest }) => {
  let auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
