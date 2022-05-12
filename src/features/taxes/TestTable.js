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

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  { id: "name1", label: "Name1", minWidth: 170 },
  { id: "size1", label: "Name2", minWidth: 170 },
  { id: "code1", label: "Name3", minWidth: 170 },
  { id: "population1", label: "Name4", minWidth: 170 },
];

function createData(
  name,
  code,
  population,
  size,
  name1,
  code1,
  population1,
  size1
) {
  const density = population / size;
  return {
    name,
    code,
    population,
    size,
    density,
    name1,
    code1,
    population1,
    size1,
  };
}

const rows = [
  createData(
    "India",
    "IN",
    1324171354,
    3287263,
    "name1",
    "code1",
    "population1",
    "size1"
  ),
  createData(
    "China",
    "CN",
    1403500365,
    9596961,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Italy",
    "IT",
    60483973,
    301340,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "United States",
    "US",
    327167434,
    9833520,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Canada",
    "CA",
    37602103,
    9984670,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Australia",
    "AU",
    25475400,
    7692024,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Germany",
    "DE",
    83019200,
    357578,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Ireland",
    "IE",
    4857000,
    70273,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Mexico",
    "MX",
    126577691,
    1972550,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Japan",
    "JP",
    126317000,
    377973,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "France",
    "FR",
    67022000,
    640679,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "United Kingdom",
    "GB",
    67545757,
    242495,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Nigeria",
    "NG",
    200962417,
    923768,
    "Nigeria",
    "Nigeria",
    "Nigeria",
    "Nigeria"
  ),
  createData(
    "Brazil",
    "BR",
    210147125,
    8515767,
    "Brazil",
    "Brazil",
    "Brazil",
    "Brazil"
  ),
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
              <TableCell align="center" style={{ width: "100px" }}>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      const isFirst = index === 0;
                      return (
                        <React.Fragment key={index}>
                          {isFirst ? (
                            <TableCell
                              align="center"
                              style={{ width: "100px" }}
                            >
                              <IconButton edge="end" aria-label="edit">
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                          ) : (
                            <></>
                          )}
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        </React.Fragment>
                      );
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
