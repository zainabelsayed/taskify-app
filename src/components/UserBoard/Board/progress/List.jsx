import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddTodoForm from "./AddTodoForm";
import Cards from "../cards/Cards";
import { database } from "../../../../firebase-config";
import { ref, set } from "firebase/database";
import DeleteListModal from "./DeleteListModal";

export default function List(props) {
  let { listTitle, listTheme, lists, setLists, id, tasks, setTasks } = props;
  useEffect(() => {
    writeListsData();
  }, [lists,tasks]);
  const list = useRef();
  const close = useRef();
  function writeListsData() {
    set(ref(database, "/lists"), {
      ...lists,
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                          delete list and its tasks                         */
  /* -------------------------------------------------------------------------- */
  const deleteList = () => {
    list.current.style.display = "none";
    close.current.click();
    const newList = lists.filter((list) => list.listId !== id);
    tasks.map((task) => {
      if (task.listId === id) {
        tasks.splice(tasks.indexOf(task), 1);
      }
      return task;
    });
    const newTasks = tasks
    setTasks([...newTasks])
    setLists([...newList]);
    console.log(lists, tasks, newList,newTasks);
  };
  /* -------------------------------------------------------------------------- */
  /*                              choose list theme                             */
  /* -------------------------------------------------------------------------- */
  listTheme =
    listTheme !== "Todo" && listTheme !== "Doing" && listTheme !== "Done"
      ? "Todo"
      : listTheme;
  return (
    <div className="col-md-3" ref={list}>
      <div
        className={`${listTheme} py-3 mb-3 position-relative rounded-5 d-flex justify-content-center align-items-baseline`}
      >
        <h2 className="text-center fs-6 fw-bold rounded-5">{listTitle}</h2>
        <button
          className="btn close-btn position-absolute top-0 end-0 py-0 px-1 me-1"
          data-bs-toggle="modal"
          data-bs-target={`#list${id}`}
        >
          <FontAwesomeIcon icon={faTimes} className="text-secondary" />
        </button>
        <DeleteListModal id={id} deleteList={deleteList} close={close} />
      </div>
      <div>
        <Droppable droppableId={id} type="TASK">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list-height"
              isDraggingOver={snapshot.isDraggingOver}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? "skyblue"
                  : "transparent",
              }}
            >
              {tasks.map((item, index) =>
                item.listId === id ? (
                  <div key={item.id}>
                    <Draggable draggableId={item.id} index={index} type="TASK">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Cards
                            item={item}
                            progressColor={listTheme}
                            textColor={`text-${listTheme}`}
                            percent={60}
                            listTitle={listTitle}
                            tasks={tasks}
                            setTasks={setTasks}
                          />
                        </div>
                      )}
                    </Draggable>
                  </div>
                ) : null
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div
        className={
          "bg-white d-flex align-items-center justify-content-center py-4 shadow border-rad-1-3rem"
        }
      >
        <button
          type="button"
          className={`fw-bold ${listTheme}-plus rounded-circle`}
          data-bs-toggle="modal"
          data-bs-target={`#modal${id}`}
        >
          +
        </button>
      </div>
      <AddTodoForm listId={id} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
