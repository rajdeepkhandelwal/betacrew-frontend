import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { isAuthenticated, signout } from "./auth";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));
const Header = ({ history }) => {
  const classes = useStyles();
  const { user } = isAuthenticated();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            🎅{isAuthenticated() ? user.name.toUpperCase() : ""}
          </Typography>
          {isAuthenticated() && (
            <Button
              onClick={() => {
                signout(() => {
                  history.push("/signin");
                });
              }}
              color="inherit"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
