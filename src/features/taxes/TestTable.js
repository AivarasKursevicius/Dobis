import * as React from "react";
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
const Head = [
  {
    id: "111",
    label: "AAAA",
    width: 170,
  },
  {
    id: "222",
    label: "BBBB",
    width: 170,
  },
  {
    id: "333",
    label: "CCCC",
    width: 170,
  },
  {
    id: "444",
    label: "DDDD",
    width: 170,
  },
  {
    id: "555",
    label: "EEEE",
    width: 170,
  },
  {
    id: "666",
    label: "FFF",
    width: 170,
  },
];
const Data = [
  {
    id: "123",
    data: [
      {
        id: "111",
        value: "40",
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
        value: "40",
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

export default function TestTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ width: "80px" }}>
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
                      console.log("row ", a, " column ", column);
                      if (a.id === column.id) {
                        return (
                          <React.Fragment key={index}>
                            {isFirst ? (
                              <TableCell align="left" style={{ width: "80px" }}>
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
        count={Data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
