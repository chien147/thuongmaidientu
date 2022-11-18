import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth?.currentUser);
  let isAuth = user?.token;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
