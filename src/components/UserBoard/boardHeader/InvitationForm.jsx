import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { useSelector} from "react-redux";
import { database } from "../../../firebase-config";
import { ref, set} from "firebase/database";
import ProjectMembers from "./ProjectMembers";

export default function InvitationForm(props) {
  const {projectID, projectName } = props
  const user = sessionStorage.getItem("user");
  const from_name = user;
  const project_name = projectName;
  const mailRef = useRef();
  const mailError = useRef();
  const [invitedMail, setInvitedMail] = useState();
  const [member, setMember] = useState([]);
  const [allMembers , setAllMembers ] = useState([])
  /* -------------------------------------------------------------------------- */
  /*                getting project members data from redux store               */
  /* -------------------------------------------------------------------------- */
  let projectMembers = useSelector((state) => state.addMemberReducer.projectMembers);
  /* -------------------------------------------------------------------------- */
  /*                               validate email                               */
  /* -------------------------------------------------------------------------- */
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
/* -------------------------------------------------------------------------- */
  /*                       to send the invitation email                       */
  /* -------------------------------------------------------------------------- */
  const sendIvite = (e) => {
    e.preventDefault();
    if (!projectMembers.includes(invitedMail)) {
      console.log(projectMembers,member)
      setMember([...member, { email: invitedMail, projectID }]);
      setAllMembers([...allMembers,{ email: invitedMail, projectID }])
      writeProjectMembersData(invitedMail,projectID);
      emailjs
        .sendForm(
          "service_sqbsi1g",
          "template_dumt1qp",
          e.target,
          "user_aLQwy8t4UwqyBfWS1TMBv"
        )
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                    write projectMembers data to database                   */
  /* -------------------------------------------------------------------------- */
  function writeProjectMembersData(email,projectID) {
    set(ref(database, "project-members/" + allMembers.length), {
      email,
      projectID
    });
  }
  return (
        <>
      <form
        className="input-group bg-transparent align-items-center"
        onSubmit={(e) => sendIvite(e)}
      >
        <ProjectMembers
          member={member}
          setMember={setMember}
          projectMembers={projectMembers}
          projectID ={projectID}
          allMembers={allMembers}
          setAllMembers={setAllMembers}
        />
        <input
          ref={mailRef}
          type="email"
          className="form-control rounded-pill input-head"
          placeholder="Invite members"
          name="invited_email"
          onChange={(e) => {
            if (validateEmail(e.target.value)) {
              setInvitedMail(e.target.value);
              mailError.current.innerText = "";
            } else {
              mailError.current.innerText = "Please Enter A Valid Email";
            }
          }}
        />
        <input
          type="text"
          className="d-none"
          name="from_name"
          value={from_name}
        />
        <input
          type="text"
          className="d-none"
          name="project_name"
          value={project_name}
        />

        <button
          className="input-group-text rounded-pill m-head text-white"
          id="basic-addon2"
          onClick={() => {
            setTimeout(()=>{
              mailRef.current.value = "";
            },3000)
          }}
        >
          Invite
        </button>
      </form>
      <p ref={mailError} className="text-danger fs-min"></p>
      </>
  );
}
