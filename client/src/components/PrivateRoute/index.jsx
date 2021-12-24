import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, userAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
