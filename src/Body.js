import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import List from "./List";
import DataChart from "./DataChart";
import UploadForm from "./UploadForm";
import { isAuthenticated } from "./auth";
import { getUserData } from "./core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "20px",
  },
  button: {
    marginLeft: "5px",
  },
}));

const Body = () => {
  const classes = useStyles();
  const [filedata, setFiledata] = useState("");
  const [issubmit, setIssubmit] = useState(false);
  const [error, setError] = useState("");
  const { user, token } = isAuthenticated();
  const getUserFileData = () => {
    getUserData(user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFiledata(data);
      }
    });
  };

  useEffect(() => {
    getUserFileData();
  }, [issubmit]);
  return (
    <div className={classes.root}>
      <UploadForm issubmit={issubmit} setIssubmit={setIssubmit} />
      <Grid
        container
        direction="row"
        justify="center"
        align="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={11} md={5}>
          <List filedata={filedata} />
        </Grid>
        <Grid item xs={11} md={5}>
          <DataChart filedata={filedata} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Body;
