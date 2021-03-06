import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const NewRow = (props) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key="08">
      <TableCell align="center">
        <IconButton
          onClick={() => props.handleCancel()}
          edge="end"
          aria-label="cancel"
        >
          <CancelIcon />
        </IconButton>
        <IconButton
          onClick={() => props.handleNewRow()}
          edge="end"
          aria-label="add"
        >
          <CheckCircleIcon />
        </IconButton>
      </TableCell>
      {props.Head.map((column, index) => {
        if (props.newRow.data.length < 6) {
          var newData = {
            id: column.id,
            value: "",
          };

          props.newRow.data = [...props.newRow.data, newData];
        }
        return (
          <TableCell onKeyPress={props.handleEnter} key={index} align="left">
            <Input
              error={props.isError}
              onChange={(e) => props.handleValueChange(e, column.id)}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default NewRow;
