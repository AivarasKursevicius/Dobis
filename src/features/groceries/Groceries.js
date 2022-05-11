import React from "react";
import TaskList from "../taskList/TaskList";

function Groceries() {
  return (
    <TaskList title="GROCERIES" placeholder="Groceries" renderAvatar={false} />
  );
}

export default Groceries;
