import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignJustify, faTimes } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../progress-bar/Progress-bar";
import "./Cards.css";
import AddTodoForm from "../progress/AddTodoForm";
import Checklists from "./Checklists";
import AssignMembers from "./AssignMembers";

function Cards(props) {
  const card = useRef();
  const { textColor, progressColor, item, tasks, setTasks, allTasks, setAllTasks,projectID } = props;
  const [statusFlag, setStatusFlag] = useState(false);
 
  useEffect(() => {
  }, [statusFlag, tasks ]);
  /* -------------------------------------------------------------------------- */
  /*                                deleting task                               */
  /* -------------------------------------------------------------------------- */
  const deleteTodo = () => {
    card.current.style.display = " ";
    const newTodos = tasks.filter((task) => task.id !== item.id);
    const updatedTasks = allTasks.filter((task) => task.id !== item.id);
    setTasks([...newTodos]);
    setAllTasks([...updatedTasks])
  };
  /* -------------------------------------------------------------------------- */
  /*                   calculate checklist progress percentage                  */
  /* -------------------------------------------------------------------------- */
  let percent = 0;
  let checklistPercent = [];
  if (item.checklist && item.checklist.length > 0) {
    const checklistNum = item.checklist.length;
    item.checklist.map((list) => {
      if (list.items) {
        const i = list.items.map((item) => item);
        if (i) {
          let checklistItems = i.length;
          let s = i.filter((item) => item.status === true)
          let status = s.length;
         
          const percentPerChecklist = ((status / checklistItems)*100)
          checklistPercent.push(percentPerChecklist);
        }
      }
    });
    let total =0
    checklistPercent.map(
      (percentItem) =>{
        total += (percentItem)
      }
    );
    percent = (total/checklistNum).toFixed(0)
    item.percent = percent;
  }

  return (
    <>
      <div
        id={item.id}
        className="bg-white shadow pt-3 pb-2 px-4 border-rad-1-3rem my-3 text-start"
        ref={card}
      >
        <div className="d-flex justify-content-between align-items-baseline ">
          <h6
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#modal${item.id}`}
          >
            {item.taskName}
          </h6>
          <button className="btn p-0 close-btn" onClick={deleteTodo}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {item.checklist && item.checklist.length > 0 ? (
          <>
            <div className="row align-items-center justify-content-start">
              <div className="col-8">
                <ProgressBar
                  percent={percent}
                  colorClass={progressColor}
                  bgColor="#faf6f6"
                />
              </div>
              <div className="col-3">
                <div className={`text-todo fs-6 fw-bold ${textColor}`}>
                  {percent}%
                </div>
              </div>
            </div>
            <div
              className="d-flex btn hover-transparent align-items-center m-0 ps-0"
              data-bs-toggle="collapse"
              href={`#collapse${item.id}`}
            >
              <FontAwesomeIcon icon={faAlignJustify} />
              <p className="m-0 fs-min ps-1">Show Checklist</p>
            </div>
            {item.checklist.map((list, index) => (
              <Checklists
              list={list}
              index={index}
              tasks={tasks}
              setTasks={setTasks}
              item={item}
              statusFlag={statusFlag}
              setStatusFlag={setStatusFlag}
              />
            ))}
          </>
        ) : (
          <div>
            <p className="fs-min">{item.description}</p>
          </div>
        )}
        <div className="ms-0 row justify-content-between align-items-baseline">
          <div
            className={`col-6 text-center mx-auto p-2 rounded-pill d-flex align-items-center justify-content-center ${progressColor}`}
          >
            <span className="fw-bold fs-date">{item.deadline}</span>
          </div>
          <AssignMembers
          item={item}
          tasks={tasks}
          setTasks={setTasks}
          textColor={textColor}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          projectID={projectID}
          />
        </div>
      </div>
      <AddTodoForm
        listId={item.id}
        tasks={tasks}
        setTasks={setTasks}
        mode="edit"
        item={item}
      />
    </>
  );
}
export default Cards;
