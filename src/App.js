import React from "react";
import "./App.css";
import Error from "./common/Error";
import Rent from "./features/rent/Rent";
import Taxes from "./features/taxes/Taxes";
import Home from "./features/home/Home";
import RentInvoice from "./features/rent/RentInvoice";
import Groceries from "./features/groceries/Groceries";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar, { DrawerHeader } from "./app/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Todo from "./features/todo/Todo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#81c784",
    },
    secondary: {
      main: "#e3f2fd",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box bgcolor="secondary.main" sx={{ display: "flex" }}>
          <CssBaseline />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/rentinvoice" element={<RentInvoice />} />
              <Route path="/taxes" element={<Taxes />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/groceries" element={<Groceries />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
