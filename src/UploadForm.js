import React, { useState } from "react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { isAuthenticated } from "./auth";
import { uploadUserFile } from "./core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "5px",
  },
}));
const UploadForm = ({ issubmit, setIssubmit }) => {
  const classes = useStyles();
  let randomString = Math.random().toString(36);
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    error: "",
    inputKey: "",
    formData: new FormData(),
  });

  const { error, formData, inputKey } = values;
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    uploadUserFile(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          error: "",
          inputKey: randomString,
        });
        setIssubmit(!issubmit);
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = event.target.files[0];
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const errorMessage = () => {
    return <Alert severity="error">{error}</Alert>;
  };
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      align="center"
      spacing={3}
    >
      <Grid item xs={11} md={10}>
        {error && errorMessage()}
      </Grid>
      <form>
        <Grid item xs={11} md={10}>
          <TextField
            onChange={handleChange("userfile")}
            key={inputKey || ""}
            type="file"
            name="userfile"
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={11} md={10}>
          <Button
            className={classes.button}
            onClick={onSubmit}
            variant="contained"
            color="primary"
            fullWidth={true}
          >
            Upload
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default UploadForm;
