import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getIsAdminFromStorage } from "./is-admin";

const PrivateRoute = ({ component: Component, ...rest }) =>
{
  const isAuthenticated = getIsAdminFromStorage();

  return (
    <Route
      {...rest}
      render={ props => isAuthenticated === 'true' ? (<Component {...props} />) : (<Redirect to="/login" />) }
    />
  );
}

export default PrivateRoute;
