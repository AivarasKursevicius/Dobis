import React from "react";
import TaskList from "../../common/TaskList";
import TransitionGroupExample from "./Card";

const Taxes = () => {
  return (
    <>
      {/* <TransitionGroupExample /> */}
      <TaskList title="TODO" placeholder="Task" renderAvatar={true} />
    </>
  );
};

export default Taxes;
