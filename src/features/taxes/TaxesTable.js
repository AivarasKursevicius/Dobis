import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { onValue, ref, remove, set, update } from "@firebase/database";
import { db } from "../../app/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getTaxes } from "./taxesSlice";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    fontSize: "inherit !important",
    width: 60,
  },
  tableCell: {
    fontSize: "inherit !important",
    // width: 130,
    height: 40,
  },
  input: {
    fontSize: "inherit !important",
    // width: 130,
    height: 40,
  },
  date: {
    fontSize: "inherit !important",
    // width: 100,
    height: 40,
  },
});
const TaxesTable = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const taxes = useSelector((state) => state.taxes);

  useEffect(() => {
    const starCountRef = ref(db, `TAXES`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(getTaxes(Object.values(data)));
      }
    });
  }, []);

  const handleEdit = (id, edit) => {
    update(ref(db, `/TAXES/${id}`), {
      edit: !edit,
      id: id,
    });
  };

  return (
    <TableContainer component={Paper} style={{ width: "100%" }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align="left">
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell className={classes.tableCell} align="left">
              Date
            </TableCell>
            {taxes[0].data.map((header, i) => (
              <TableCell key={i} align="left">
                {header.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {taxes.map((outerTax, i) => {
            return (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className={classes.tableCell}
                  key={outerTax.id}
                  align="left"
                >
                  <IconButton
                    onClick={() => handleEdit(outerTax.id, outerTax.edit)}
                    edge="end"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell} key={i} align="left">
                  {outerTax.edit ? (
                    <TextField
                      className={classes.date}
                      id="date"
                      type="date"
                      defaultValue={outerTax.date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : (
                    outerTax.date
                  )}
                </TableCell>
                {outerTax.data.map((innerTax, i) => {
                  return (
                    <TableCell
                      className={classes.tableCell}
                      key={i}
                      align="left"
                    >
                      {outerTax.edit ? (
                        <Input
                          className={classes.input}
                          key={i}
                          value={innerTax.value}
                        />
                      ) : (
                        innerTax.value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaxesTable;
