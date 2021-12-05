import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faCheckDouble,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";
import ProgressBar from "../progress-bar/Progress-bar";
import "./Cards.css";
import AddTodoForm from "../progress/AddTodoForm";

function Cards(props) {
  const card = useRef();
  const { textColor, progressColor, item, tasks, setTasks } = props;
  const [statusFlag, setStatusFlag] = useState(false);
  /* -------------------------------------------------------------------------- */
  /*                           getting project members                          */
  /* -------------------------------------------------------------------------- */
  const projectMembers = useSelector((state) => state.projectMembers);
  console.log(projectMembers);
  useEffect(() => {
    if (item.taskMembers && item.taskMembers.length > 0) {
      item.taskMembers.map((member) => {
        if (!projectMembers.includes(member)) {
          item.taskMembers.splice(item.taskMembers.indexOf(member), 1);
        }
      });
    }
    const updatedTasks = tasks;
    setTasks([...updatedTasks]);
  }, [projectMembers]);
  useEffect(() => {
    console.log(tasks, statusFlag, projectMembers);
  }, [statusFlag, tasks, projectMembers]);
  /* -------------------------------------------------------------------------- */
  /*                                deleting task                               */
  /* -------------------------------------------------------------------------- */
  const deleteTodo = () => {
    card.current.style.display = " ";
    const newTodos = tasks.filter((task) => task.id !== item.id);
    setTasks([...newTodos]);
    console.log("clicked", newTodos, tasks);
  };
  /* -------------------------------------------------------------------------- */
  /*                   calculate checklist progress percentage                  */
  /* -------------------------------------------------------------------------- */
  let percent = 0;
  if (item.checklist && item.checklist.length > 0) {
    let [i] = item.checklist.map((list) =>
      list.items ? list.items.map((item) => item) : null
    );
    if (i) {
      let checklistItems = i.length;
      let [s] = item.checklist.map((list) =>
        list.items.filter((item) => item.status === true)
      );
      let status = s.length;
      percent = ((status / checklistItems) * 100).toFixed(0);
      item.percent = percent;
      console.log(checklistItems, status, percent);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                         add assigend member to task                        */
  /* -------------------------------------------------------------------------- */

  const assignMember = (member) => {
    if (!item.taskMembers) {
      item.taskMembers = [];
    }
    if (item.taskMembers && !item.taskMembers.includes(member)) {
      item.taskMembers = [...item.taskMembers, member];
      const newTasks = tasks;
      setTasks([...newTasks]);
      console.log(tasks, member);
      const templateParams = {
        from_name: "Taskify members",
        project_name: "Graduation Project",
        invited_email: member,
        task_name: item.taskName,
      };
      emailjs
        .send(
          "service_sqbsi1g",
          "template_9w6l395",
          templateParams,
          "user_aLQwy8t4UwqyBfWS1TMBv"
        )
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
          },
          function (error) {
            console.log("FAILED...", error);
          }
        );
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                      remove assigend member from task                      */
  /* -------------------------------------------------------------------------- */

  const removeMember = (member) => {
    item.taskMembers.splice(item.taskMembers.indexOf(member), 1);
    const newTasks = tasks;
    setTasks([...newTasks]);
    console.log(item, tasks);
  };
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
              <div
                className="collapse mb-1"
                id={`collapse${item.id}`}
                key={item.id}
              >
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faCheckDouble} />
                  <p className="pb-1 m-0 fs-min ps-2">{list.title}</p>
                </div>
                {list.items
                  ? list.items.map((checklistItem, indx) => (
                      <div className="form-check fs-min m-0" key={indx}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          defaultChecked={checklistItem.status}
                          onChange={(e) => {
                            if (e.target.checked) {
                              checklistItem.status = true;
                            } else {
                              checklistItem.status = false;
                            }
                            statusFlag
                              ? setStatusFlag(false)
                              : setStatusFlag(true);
                            const newTasks = tasks;
                            setTasks([...newTasks]);
                          }}
                        />
                        <label
                          className={
                            checklistItem.status
                              ? `form-check-label fs-min text-decoration-line-through`
                              : `fs-min form-check-label`
                          }
                          htmlFor="flexCheckDefault"
                        >
                          {checklistItem.item}
                        </label>
                      </div>
                    ))
                  : null}
              </div>
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
          <div className="col-6">
            <div className="row g-0 justify-content-between align-items-baseline overflow-visible">
              <div className="col-10 d-flex justify-content-center align-items-center">
                {item.taskMembers?.length > 0
                  ? item.taskMembers.map((memberMail, index) => (
                      <div key={index}>
                          <button
                            type="button"
                            className="border-0 mem-icon fw-bold fs-min shadow-sm"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {memberMail.charAt(0)}
                          </button>
                        <ul class="dropdown-menu">
                          <li
                            className="text-danger fs-min px-2"
                            onClick={() => {
                              removeMember(memberMail);
                            }}
                          >
                            Remove
                          </li>
                        </ul>
                      </div>
                    ))
                  : null}
              </div>
              <div className="col-2 ps-2">
                <button
                  type="button"
                  class={`btn hover-transparent ${textColor} p-0 dropdown-toggle dropdown-toggle-split`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul class="dropdown-menu">
                  {projectMembers?.length > 0 ? (
                    projectMembers.map((member, index) => (
                      <li
                        className="fs-min px-2 border-bottom"
                        key={index}
                        onClick={() => {
                          assignMember(member);
                        }}
                      >
                        {member}
                      </li>
                    ))
                  ) : (
                    <p className="fs-min ps-2">
                      you don't have any project members to assign!
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </div>
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
