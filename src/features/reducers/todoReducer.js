// import * as types from "../actions/actionTypes";
// import { v4 as uuidv4 } from "uuid";
// import { Satellite } from "@mui/icons-material";

// const initialState = {
//   todos: [{ id: 1, task: "Wake Up", completed: false }],
// };

// const todoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.REMOVE_TODO:
//       const filterTodo = state.todos.filter((t) => t.id !== action.payload.id);
//       return {
//         ...state,
//         todos: filterTodo,
//       };
//     case types.ADD_TODO:
//       const newTodo = {
//         id: uuidv4(),
//         task: action.payload,
//         completed: false,
//       };
//       const addedTodo = [...state.todos, newTodo];
//       return {
//         ...state,
//         todos: addedTodo,
//       };
//     case types.COMPLETE_TODO:
//       const toggleTodos = state.todos.map((t) => {
//         if (t.id === action.payload.id) {
//           return { ...action.payload, completed: !action.payload.completed };
//         }
//         return t;
//       });
//       return {
//         ...state,
//         todos: toggleTodos,
//       };
//     default:
//       return state;
//   }
// };

// export default todoReducer;
