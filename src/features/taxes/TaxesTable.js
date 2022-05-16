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
import { onValue, ref, set } from "@firebase/database";
import { db } from "../../app/firebase";
import NewRow from "./NewRow";
import Row from "./Row";

const Head = [
  {
    id: "111",
    label: "AAAA",
    width: 170,
    owner: "A",
  },
  {
    id: "222",
    label: "BBBB",
    width: 170,
    owner: "A",
  },
  {
    id: "333",
    label: "CCCC",
    width: 170,
    owner: "ALL",
  },
  {
    id: "444",
    label: "DDDD",
    width: 170,
    owner: "ALL",
  },
  {
    id: "555",
    label: "EEEE",
    width: 170,
    owner: "G",
  },
  {
    id: "666",
    label: "FFF",
    width: 170,
    owner: "G",
  },
];

const TaxesTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditRow, setIsEditRow] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [newRow, setNewRow] = useState({ data: [] });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const starCountRef = ref(db, `TAXES/DATA`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const sortedData = Object.values(data)
          .slice()
          .sort((a, b) => b.date - a.date);
        setRowData(sortedData);
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

  const handleValueChange = (e, id) => {
    newRow.data.map((item) =>
      item.id === id ? (item.value = e.target.value) : item.value
    );
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

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  width: "100px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              </TableCell>
              {Head.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
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
                Head={Head}
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
                    Head={Head}
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
