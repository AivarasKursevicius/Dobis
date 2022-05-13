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
import { onValue, ref, remove, set, update } from "@firebase/database";
import { db } from "../../app/firebase";
import Input from "@mui/material/Input";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { uid as uuid } from "uid";

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

export default function TestTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditRow, setIsEditRow] = useState(false);
  const [isEditCol, setIsEditCol] = useState(false);
  const [headData, setHeadData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [newRow, setNewRow] = useState({ data: [] });

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
    const uid = uuid();
    newRow["date"] = new Date().getTime();
    set(ref(db, `TAXES/DATA/${uid}`), newRow);
    setNewRow({ data: [] });
    props.setIsNewRow(false);
  };

  const handleValueChange = (e, id) => {
    newRow.data.map((item) => {
      if (item.id === id) {
        item.value = e.target.value;
      }
    });
  };

  const handleCancel = () => {
    props.setIsNewRow(false);
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
              <TableCell align="center">
                <IconButton
                  style={{ width: "80px" }}
                  edge="end"
                  aria-label="edit"
                >
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
              <TableRow hover role="checkbox" tabIndex={-1} key="08">
                <TableCell
                  align="center"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <IconButton
                    onClick={() => handleCancel()}
                    edge="end"
                    aria-label="edit"
                  >
                    <CancelIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleNewRow()}
                    edge="end"
                    aria-label="edit"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </TableCell>
                {Head.map((column, index) => {
                  var newData = {
                    id: column.id,
                    value: "",
                  };
                  newRow.data = [...newRow.data, newData];
                  return (
                    <TableCell
                      onKeyPress={handleEnter}
                      key={index}
                      align="left"
                    >
                      <Input
                        onChange={(e) => handleValueChange(e, column.id)}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ) : (
              <></>
            )}
            {rowData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {Head.map((column, index) => {
                      const isFirst = index === 0;
                      return row.data.map((a) => {
                        if (a.id === column.id) {
                          return (
                            <React.Fragment key={index}>
                              {isFirst ? (
                                <TableCell
                                  onClick={() => handleEditRowToggle()}
                                  align="center"
                                  style={{ width: "80px" }}
                                >
                                  <IconButton edge="end" aria-label="edit">
                                    <EditIcon />
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
}
