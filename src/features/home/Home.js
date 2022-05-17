import React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import "./Home.css";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";

const Home = () => {
  const navigate = useNavigate();

  const routeChange = (to) => {
    navigate(to);
  };

  return (
    <>
      <Card sx={{ width: { xs: `calc(100% - 20px)` } }} className="card">
        <CardActionArea onClick={() => routeChange("/rent")}>
          <CardContent>
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
              RENT
            </Typography>
            <HomeWorkRoundedIcon
              fontSize="large"
              sx={{ width: { xs: `calc(100% - 20px)` } }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
      <Card sx={{ width: { xs: `calc(100% - 20px)` } }} className="card">
        <CardActionArea onClick={() => routeChange("/rentinvoice")}>
          <CardContent>
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
              RENT INVOICE
            </Typography>
            <ReceiptRoundedIcon
              fontSize="large"
              sx={{ width: { xs: `calc(100% - 20px)` } }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
      <Card sx={{ width: { xs: `calc(100% - 20px)` } }} className="card">
        <CardActionArea onClick={() => routeChange("/taxes")}>
          <CardContent>
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
              TAXES
            </Typography>
            <PaidRoundedIcon
              fontSize="large"
              sx={{ width: { xs: `calc(100% - 20px)` } }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
      <Card sx={{ width: { xs: `calc(100% - 20px)` } }} className="card">
        <CardActionArea onClick={() => routeChange("/todo")}>
          <CardContent>
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
              TODO
            </Typography>
            <FormatListNumberedRoundedIcon
              fontSize="large"
              sx={{ width: { xs: `calc(100% - 20px)` } }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
      <Card sx={{ width: { xs: `calc(100% - 20px)` } }} className="card">
        <CardActionArea onClick={() => routeChange("/groceries")}>
          <CardContent>
            <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
              GROCERIES
            </Typography>
            <AddShoppingCartRoundedIcon
              fontSize="large"
              sx={{ width: { xs: `calc(100% - 20px)` } }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Home;
