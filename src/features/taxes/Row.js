import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref, remove, update } from "@firebase/database";
import { db } from "../../app/firebase";
import { uid } from "uid";
import Input from "@mui/material/Input";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Row = (props) => {
  const deleteRow = (date) => {
    const row = props.rows.find((row) => row.date === date);
    remove(ref(db, `/TAXES/DATA/${row.date}`));
    props.setRowData(props.rows.filter((row) => row.date !== date));
  };

  const toggleEdit = (row) => {
    row.isEdit = !row.isEdit;
  };

  const submitChanges = (row) => {
    row.isEdit = false;
    update(ref(db, `/TAXES/DATA/${row.date}`), row);
  };

  const handleValueChange = (e, id, row) => {
    row.data.map((item) =>
      item.id === id ? (item.value = e.target.value) : item.value
    );
  };

  const handleEnter = (e, row) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitChanges(row);
    }
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={props.i}>
      {props.Head.map((column, index) => {
        const isFirst = index === 0;
        return props.row.data.map((a) =>
          a.id === column.id ? (
            <React.Fragment key={index}>
              {isFirst ? (
                <TableCell
                  onClick={() => props.handleEditRowToggle()}
                  align="center"
                  style={{ width: "100px" }}
                >
                  <IconButton
                    onClick={() => toggleEdit(props.row)}
                    edge="end"
                    aria-label="edit"
                  >
                    {props.row.isEdit ? <CancelIcon /> : <EditIcon />}
                  </IconButton>
                  {props.row.isEdit ? (
                    <IconButton
                      onClick={() => submitChanges(props.row)}
                      edge="end"
                      aria-label="submit"
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => deleteRow(props.row.date)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              ) : (
                <></>
              )}
              <TableCell
                onKeyPress={(e) => handleEnter(e, props.row)}
                key={column.id}
                align="left"
              >
                {props.row.isEdit ? (
                  <Input
                    defaultValue={a.value}
                    onChange={(e) => handleValueChange(e, column.id, props.row)}
                  />
                ) : (
                  a.value
                )}
              </TableCell>
            </React.Fragment>
          ) : (
            <React.Fragment key={uid()} />
          )
        );
      })}
    </TableRow>
  );
};

export default Row;
