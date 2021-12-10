import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import emailjs from "emailjs-com";

export default function AssignMembers(props) {
  const { item, textColor, tasks, setTasks, allTasks,setAllTasks } = props;
  /* -------------------------------------------------------------------------- */
  /*                           getting project members                          */
  /* -------------------------------------------------------------------------- */
  const projectMembers = useSelector((state) => state.addMemberReducer.projectMembers);
  useEffect(() => {
    if (item.taskMembers && item.taskMembers.length > 0) {
      item.taskMembers.forEach((member) => {
        if (!projectMembers.includes(member)) {
          item.taskMembers.splice(item.taskMembers.indexOf(member), 1);
        }
      });
    }
    const updatedTasks = tasks;
    setTasks([...updatedTasks]);
  }, [projectMembers]);
  /* -------------------------------------------------------------------------- */
  /*                         add assigend member to task                        */
  /* -------------------------------------------------------------------------- */

  const assignMember = (member) => {
    if (!item.taskMembers) {
      item.taskMembers = [];
    }
    if (item.taskMembers && !item.taskMembers.includes(member)) {
      item.taskMembers = [...item.taskMembers, member];
      allTasks.map(task=>{
        if(task.id === item.id){
          if (!task.taskMembers) {
            task.taskMembers = [];
          }
          task.taskMembers = [...task.taskMembers, member];
        }
      })
      const newTasks = tasks;
      setTasks([...newTasks]);
      const templateParams = {
        from_name: "Taskify members",
        project_name: `Graduation Project assigned task ${item.taskName}`,
        invited_email: member,
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
    allTasks.map(task=>{
      if(task.id === item.id){
        task.taskMembers.splice(task.taskMembers.indexOf(member), 1);
      }
    })
    const newTasks = tasks;
    setTasks([...newTasks]);
  };

  return (
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
                    data-tip
                    data-for={memberMail}
                  >
                    {memberMail.charAt(0)}
                  </button>
                  <ReactTooltip
                    id={memberMail}
                    type="light"
                    border="true"
                    borderColor="#f476a3"
                    place="bottom"
                  >
                    <span>{memberMail}</span>
                  </ReactTooltip>
                  <ul class="dropdown-menu">
                    <li
                      className="text-danger fs-min ps-2"
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
                  className="fs-min ps-2 border-bottom"
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
  );
}
