import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { fileHelper } from "./core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 350,
    marginTop: "25px",
  },
}));

const List = ({ filedata }) => {
  const classes = useStyles();
  return (
    <div>
      {filedata.length > 0 && (
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SN No.</TableCell>
                <TableCell align="center">FileName</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filedata ? (
                filedata.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{fileHelper(row)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center">No Data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default List;
