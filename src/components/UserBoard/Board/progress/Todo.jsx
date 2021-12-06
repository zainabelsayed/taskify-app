import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import Cards from "../cards/Cards";
import AddTodoForm from "./AddTodoForm";

export default function Todo() {
  const [todo, setTodo] = useState([]);

  var category = useParams().category;
  if (category === undefined) category = "Work";

  return (
    <div
      className="d-flex flex-row flex-wrap"
      id="todo"
      style={{ columnGap: "0.5em" }}
    >
      
      {/* <div>
        <h2 className="todo-bg py-3 text-center fs-6 fw-bold rounded-5">
          To do
        </h2>
      </div> */}
      {todo
        .filter((item) => item.category === category)
        .map((item) => (
          <div key={item.id} className="col-md-4" style={{ width: "32%" }}>
            <Cards
              setTodo={setTodo}
              item={item}
              todo={todo}
              progressColor="progress-todo"
              textColor="text-todo"
              percent={item.percent}
            />
          </div>
        ))}
      <div className="bg-white d-flex align-items-center justify-content-center py-4 shadow border-rad-1-3rem col-md-4 my-auto mx-0">
        <button
          className="fw-bold todo-plus rounded-circle"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          +
        </button>
      </div>
      <AddTodoForm todo={todo} setTodo={setTodo} />
    </div>
  );
}