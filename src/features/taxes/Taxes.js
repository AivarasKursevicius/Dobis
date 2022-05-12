import React, { useState, useEffect } from "react";
import TaxesTable from "./TaxesTable";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TestTable from "./TestTable";
import useMediaQuery from "../../useMediaQuery";
import "./Taxes.css";

function Taxes() {
  const [filter, setFilter] = useState("ALL");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Card
      sx={{
        minWidth: "275px",
        maxWidth: "95%",
        margin: "auto",
      }}
    >
      <h1 align="center">TAXES</h1>
      <CardContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", overflowX: "auto" }}
        >
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Taxes for
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={filter}
              onChange={handleChange}
            >
              <MenuItem value="ALL">Abieju</MenuItem>
              <MenuItem value="A">Aivaro</MenuItem>
              <MenuItem value="G">Guodos</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<AddCircleIcon />}>
            ADD NEW ROW
          </Button>
        </Box>
      </CardContent>
      <TestTable />
    </Card>
  );
}

export default Taxes;
