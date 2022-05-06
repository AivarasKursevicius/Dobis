import { configureStore } from "@reduxjs/toolkit";
// import allReducers from "./reducers";
import todosReducer from "../../features/tasks/taskSlice";
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
