import React, { useState } from "react";
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
const Data = [
  {
    id: "123",
    data: [
      {
        id: "111",
        value: "41",
      },
      {
        id: "222",
        value: "34",
      },
      {
        id: "333",
        value: "67",
      },
      {
        id: "444",
        value: "90",
      },
      {
        id: "555",
        value: "689",
      },
      {
        id: "666",
        value: "345",
      },
    ],
  },
  {
    id: "456",
    date: "2022-05-05",
    data: [
      {
        id: "111",
        value: "42",
      },
      {
        id: "222",
        value: "34",
      },
      {
        id: "333",
        value: "67",
      },
      {
        id: "444",
        value: "90",
      },
      {
        id: "555",
        value: "689",
      },
      {
        id: "666",
        value: "345",
      },
    ],
  },
  {
    id: "123",
    data: [
      {
        id: "111",
        value: "43",
      },
      {
        id: "222",
        value: "34",
      },
      {
        id: "333",
        value: "67",
      },
      {
        id: "444",
        value: "90",
      },
      {
        id: "555",
        value: "689",
      },
      {
        id: "666",
        value: "345",
      },
    ],
  },
  {
    id: "456",
    date: "2022-05-05",
    data: [
      {
        id: "111",
        value: "44",
      },
      {
        id: "222",
        value: "34",
      },
      {
        id: "333",
        value: "67",
      },
      {
        id: "444",
        value: "90",
      },
      {
        id: "555",
        value: "689",
      },
      {
        id: "666",
        value: "345",
      },
    ],
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

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "150px" }}>
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
            {Data.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row, i) => {
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
            {props.isNewRow ? (
              <TableRow hover role="checkbox" tabIndex={-1} key="08">
                <TableCell
                  align="center"
                  style={{
                    width: "150px",
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
                    <TableCell key={index} align="left">
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
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={Data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
