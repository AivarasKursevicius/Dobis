import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Rent() {
  return (
    <Card sx={{ width: { xs: `calc(100% - 20px)` } }} className="card">
      <CardContent>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          RENT PAGE
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Rent;
