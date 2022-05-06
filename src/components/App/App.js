import React from "react";
import "./style.css";
import Error from "../../Error";
import Rent from "../Rent/Rent";
import Taxes from "../Taxes/Taxes";
import Home from "../Home/Home";
import RentInvoice from "../Rent/RentInvoice";
import Groceries from "../Groceries/Groceries";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { useSelector } from "react-redux";
import Sidebar, { DrawerHeader } from "../Sidebar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Todo from "../Todo/Todo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TodoList from "../Common/TodoList";
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
  // const isLogged = useSelector((state) => state.isLogged);

  return (
    <ThemeProvider theme={theme}>
      <TodoList title="TODO" placeholder="Task" renderAvatar={true} />
      {/* <BrowserRouter>
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
      </BrowserRouter> */}
    </ThemeProvider>
  );
};

export default App;
