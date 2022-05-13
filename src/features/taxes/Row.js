import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref, remove } from "@firebase/database";
import { db } from "../../app/firebase";

const Row = (props) => {
  const deleteRow = (date) => {
    const row = props.rows.find((row) => row.date === date);
    remove(ref(db, `/TAXES/DATA/${row.date}`));
    props.setRowData(props.rows.filter((row) => row.date !== date));
  };
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={props.i}>
      {props.Head.map((column, index) => {
        const isFirst = index === 0;
        return props.row.data.map((a) => {
          if (a.id === column.id) {
            return (
              <React.Fragment key={index}>
                {isFirst ? (
                  <TableCell
                    onClick={() => props.handleEditRowToggle()}
                    align="center"
                    style={{ width: "100px" }}
                  >
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteRow(props.row.date)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                ) : (
                  <></>
                )}
                <TableCell key={column.id} align="left">
                  {a.value}
                </TableCell>
              </React.Fragment>
            );
          }
        });
      })}
    </TableRow>
  );
};

export default Row;
