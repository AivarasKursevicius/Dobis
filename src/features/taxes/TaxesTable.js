import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { onValue, ref, set, remove } from "@firebase/database";
import { db } from "../../app/firebase";
import NewRow from "./NewRow";
import Row from "./Row";
import Input from "@mui/material/Input";
import { uid } from "uid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

const TaxesTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditRow, setIsEditRow] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [head, setHead] = useState([]);
  const [newRow, setNewRow] = useState({ data: [] });
  const [newCol, setNewCol] = useState({ label: "" });
  const [isDelCol, setIsDelCol] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const taxesDataRef = ref(db, `TAXES/DATA`);
    onValue(taxesDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const sortedData = Object.values(data)
          .slice()
          .sort((a, b) => b.date - a.date);
        setRowData(sortedData);
      }
    });
    const taxesColumnRef = ref(db, `TAXES/COLUMN`);
    onValue(taxesColumnRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const sortedData = Object.values(data)
          .slice()
          .sort((a, b) => a.date - b.date);
        setHead(sortedData);
      }
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditRowToggle = () => {
    setIsEditRow(!isEditRow);
  };

  const handleNewRow = () => {
    if (newRow.data.some((item) => item.value.trim() !== "")) {
      setIsError(false);
      newRow.date = new Date().getTime();
      newRow.isEdit = false;
      set(ref(db, `TAXES/DATA/${newRow.date}`), newRow);
      setNewRow({ data: [], isEdit: false });
      props.setIsNewRow(false);
    } else {
      setIsError(true);
    }
  };

  const handleNewCol = () => {
    if (newCol.label !== "") {
      set(ref(db, `TAXES/COLUMN/${newCol.id}`), newCol);
      setNewCol({ label: "" });
      props.setIsNewCol(false);
    }
  };

  const handleValueChange = (e, id) => {
    newRow.data.map((item) =>
      item.id === id ? (item.value = e.target.value) : item.value
    );
  };

  const handleValueChangeCol = (e) => {
    setNewCol({
      id: uid(),
      label: e.target.value,
      width: 170,
      date: new Date().getTime(),
      owner: "ALL",
    });
  };

  const handleCancel = () => {
    props.setIsNewRow(false);
    setIsError(false);
    setNewRow({ data: [] });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNewRow();
    }
  };
  const handleEnterCol = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNewCol();
    }
  };

  const toggleDelCol = () => {
    setIsDelCol(!isDelCol);
    console.log(isDelCol);
  };

  const deleteCol = (id) => {
    remove(ref(db, `/TAXES/COLUMN/${id}`));
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* {props.isNewCol ? (
                <TableCell
                align="center"
                style={{
                  width: "100px",
                }}
              >
                <IconButton
                  onClick={() => handleNewCol()}
                  edge="end"
                  aria-label="submit"
                >
                  <CheckCircleIcon />
                </IconButton>
              </TableCell>
              ) : <></> }
              {head.length ? (
                <TableCell
                  align="center"
                  style={{
                    width: "100px",
                  }}
                >
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => toggleDelCol()}
                    edge="end"
                    aria-label="delete"
                  >
                    {isDelCol ? <CancelIcon /> : <DeleteIcon />}
                  </IconButton>
                </TableCell>
              ) : <></>} */}
              {props.isNewCol ? (
                <TableCell
                  align="center"
                  style={{
                    width: "100px",
                  }}
                >
                  <IconButton
                    onClick={() => handleNewCol()}
                    edge="end"
                    aria-label="submit"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </TableCell>
              ) : head.length ? (
                <TableCell
                  align="center"
                  style={{
                    width: "100px",
                  }}
                >
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => toggleDelCol()}
                    edge="end"
                    aria-label="delete"
                  >
                    {/* <DeleteIcon /> */}
                    {isDelCol ? <CancelIcon /> : <DeleteIcon />}
                  </IconButton>
                </TableCell>
              ) : (
                <></>
              )}

              {head.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.width }}
                >
                  {isDelCol && !props.isNewCol ? (
                    <React.Fragment>
                      {column.label}
                      <IconButton
                        onClick={() => deleteCol(column.id)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </React.Fragment>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {props.isNewCol ? (
                <TableCell
                  key={1000}
                  align="left"
                  style={{ minWidth: "170px" }}
                  onKeyPress={handleEnterCol}
                >
                  <Input onChange={(e) => handleValueChangeCol(e)} />
                </TableCell>
              ) : (
                <></>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.isNewRow ? (
              <NewRow
                handleCancel={handleCancel}
                handleNewRow={handleNewRow}
                newRow={newRow}
                handleValueChange={handleValueChange}
                handleEnter={handleEnter}
                Head={head}
                isError={isError}
              />
            ) : (
              <></>
            )}

            {rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <Row
                    key={i}
                    row={row}
                    Head={head}
                    rows={rowData}
                    setRowData={setRowData}
                    handleEditRowToggle={handleEditRowToggle}
                    handleValueChange={handleValueChange}
                    i={i}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rowData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TaxesTable;
