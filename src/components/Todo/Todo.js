import React from "react";
import TaskList from "../Common/TaskList";
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
