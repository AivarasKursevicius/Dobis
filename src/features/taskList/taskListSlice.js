import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    getAllTasks: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { getAllTasks } = taskListSlice.actions;

export default taskListSlice.reducer;
