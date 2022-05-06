import React from "react";
import TaskList from "../../common/TaskList";

function Groceries() {
  return (
    <>
      <TaskList
        title="GROCERIES"
        placeholder="Groceries"
        renderAvatar={false}
      />
    </>
  );
}

export default Groceries;
