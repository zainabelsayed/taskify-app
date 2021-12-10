import React, { useEffect, useRef,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddTodoForm from "./AddTodoForm";
import Cards from "../cards/Cards";
import { database } from "../../../../firebase-config";
import { ref, set } from "firebase/database";
import DeleteListModal from "./DeleteListModal";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

export default function List(props) {
  let {
    listTitle,
    listTheme,
    lists,
    setLists,
    id,
    tasks,
    setTasks,
    projectID,
    allLists,
    setAllLists,
    allTasks,
    setAllTasks,
  } = props;
  const [arrIcon,setArrIcon]=useState(faChevronDown);
  /* -------------------------------------------------------------------------- */
  /*       to show accordions/ drop down menu when the screen size changes      */
  /* -------------------------------------------------------------------------- */
  const [innerWidth, setInnerWidth]=useState(window.innerWidth);
  const breakpoint = 800;
  useEffect(() => {
    const handleResizeWindow = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD){
      handleResizeWindow();
    }
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  const list = useRef();
  const close = useRef();
  function writeListsData(allLists) {
    set(ref(database, "/lists"), {
      ...allLists,
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                          delete list and its tasks                         */
  /* -------------------------------------------------------------------------- */
  const deleteList = () => {
    list.current.style.display = "none";
    close.current.click();
    const newList = lists.filter((list) => list.listId !== id);
    const newLists = allLists.filter((list) => list.listId !== id);
    tasks.map((task) => {
      if (task.listId === id) {
        tasks.splice(tasks.indexOf(task), 1);
      }
      return task;
    });
    const newTasks = tasks;
    setTasks([...newTasks]);
    allTasks.map((task) => {
      if (task.listId === id) {
        tasks.splice(tasks.indexOf(task), 1);
      }
      return task;
    });
    const newAllTasks = allTasks;
    setAllTasks([...newAllTasks]);
    setLists([...newList]);
    setAllLists([...newLists]);
    writeListsData(newLists);
  };
  /* -------------------------------------------------------------------------- */
  /*                              choose list theme                             */
  /* -------------------------------------------------------------------------- */
  listTheme =
    listTheme !== "Todo" && listTheme !== "Doing" && listTheme !== "Done"
      ? "Todo"
      : listTheme;
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12" ref={list}>
      { innerWidth > breakpoint ?
      (
        <>
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
                            projectID={projectID}
                            allTasks={allTasks}
                            setAllTasks={setAllTasks}
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
      </>
      ):(
        <Accordion allowZeroExpanded="true">
        <AccordionItem uuid={`${id}`}>
          <AccordionItemHeading  onClick={()=>{
                if(arrIcon === faChevronDown){
                  setArrIcon(faChevronUp)
                }
                else if(arrIcon === faChevronUp){
                  setArrIcon(faChevronDown)
                }
              }}>
            <AccordionItemButton
              className={`${listTheme} py-3 mb-3 position-relative rounded-5 d-flex justify-content-center align-items-baseline`}
            >
              <h2 className="text-center fs-6 fw-bold rounded-5">
                <button className="btn arrow-btn me-2 p-0">
                  <FontAwesomeIcon icon={arrIcon}></FontAwesomeIcon>
                </button>
                {listTitle}
              </h2>
              <button
                className="btn close-btn position-absolute top-0 end-0 py-0 px-1 me-1"
                data-bs-toggle="modal"
                data-bs-target={`#list${id}`}
              >
                <FontAwesomeIcon icon={faTimes} className="text-secondary" />
              </button>
              <DeleteListModal id={id} deleteList={deleteList} close={close} />
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
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
                          <Draggable
                            draggableId={item.id}
                            index={index}
                            type="TASK"
                          >
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
                                  allTasks={allTasks}
                                  setAllTasks={setAllTasks}
                                  projectID={projectID}
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
                "bg-white d-flex align-items-center justify-content-center py-4 shadow border-rad-1-3rem mb-3"
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
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>)}
      <AddTodoForm
        listId={id}
        tasks={tasks}
        setTasks={setTasks}
        projectID={projectID}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
      />
    </div>
  );
}
