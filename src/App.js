import React from "react";
import "./App.css";
import Error from "./common/Error";
import Rent from "./features/rent/Rent";
import Taxes from "./features/taxes/Taxes";
import Home from "./features/home/Home";
import RentInvoice from "./features/rent/RentInvoice";
import Groceries from "./features/groceries/Groceries";
import { Routes, Route } from "react-router-dom";

import Todo from "./features/todo/Todo";
import { LoginPage } from "./features/login/Login";
import { ProtectedLayout } from "./ProtectedLayout";
import { PublicLayout } from "./PublicLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/rentinvoice" element={<RentInvoice />} />
        <Route path="/taxes" element={<Taxes />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/groceries" element={<Groceries />} />
      </Route>
    </Routes>
  );
};

export default App;
