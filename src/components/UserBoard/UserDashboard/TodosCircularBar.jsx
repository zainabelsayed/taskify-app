import React from "react";
import TodosCircluarProgressBar from "./TodosCircluarProgressBar";

export default function TodosCircularBar(props) {
  const { tasks } = props;
  const todo = tasks.filter((task) => task.list === "Todo");
  const doing = tasks.filter((task) => task.list === "Doing");
  const done = tasks.filter((task) => task.list === "Done");
  const todoPercent = (todo.length / tasks.length) * 100;
  const doingPercent = (doing.length / tasks.length) * 100;
  const donePercent = (done.length / tasks.length) * 100;
  return <div className="userDashboard circular-todos justify-content-between align-items-center mt-3">
      <TodosCircluarProgressBar
      percent = {todoPercent}
      count = {todo.length}
      name = "To do"
      className= "todo"
      />
      <TodosCircluarProgressBar
      percent = {doingPercent}
      count = {doing.length}
      name = "Doing"
      className = "doing"
      />
      <TodosCircluarProgressBar
      percent = {donePercent}
      count = {done.length}
      name = "Done"
      className="done"
      />
  </div>;
}
