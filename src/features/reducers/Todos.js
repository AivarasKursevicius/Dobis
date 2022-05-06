import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: { value: [] },
  reducers: {
    addTodo: (state, action) => {
      state.value.push(action.payload);
    },

    deleteTodo: (state, action) => {
      state.value = state.value.filter((todo) => todo.id !== action.payload.id);
    },

    updateTodo: (state, action) => {
      state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.todo = action.payload.todo;
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
