import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "../features/taskList/taskListSlice";
import taxesReducer from "../features/taxes/taxesSlice";
const store = configureStore({
  reducer: {
    tasks: taskListReducer,
    taxes: taxesReducer,
  },
});

export default store;
