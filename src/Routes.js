import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./auth/PrivateRoute";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={App} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
