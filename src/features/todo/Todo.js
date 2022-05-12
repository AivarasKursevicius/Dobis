import React from "react";
import TaskList from "../taskList/TaskList";

const Todo = () => {
  return (
    <>
      <TaskList title="TODO" placeholder="Task" renderAvatar={true} />
    </>
  );
};

export default Todo;
