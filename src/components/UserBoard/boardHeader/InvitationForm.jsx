import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { useSelector, useDispatch } from "react-redux";
import { database } from "../../../firebase-config";
import { ref, set} from "firebase/database";
import { addMemberAction } from "../../store/projectMembersStore";
import ProjectMembers from "./ProjectMembers";

export default function InvitationForm() {
  const from_name = "Taskify members";
  const project_name = "Graduation Project";
  const mailRef = useRef();
  const mailError = useRef();
  const dispatch = useDispatch();
  const [invitedMail, setInvitedMail] = useState();
  const [member, setMember] = useState([]);
  /* -------------------------------------------------------------------------- */
  /*                getting project members data from redux store               */
  /* -------------------------------------------------------------------------- */
  let projectMembers = useSelector((state) => state.projectMembers);
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
    console.log(projectMembers);
    if (!projectMembers.includes(invitedMail)) {
      dispatch(addMemberAction(invitedMail));
      setMember([...member, { email: invitedMail }]);
      writeProjectMembersData(invitedMail);
      emailjs
        .sendForm(
          "service_szwzkxn",
          "template_709z4cd",
          e.target,
          "user_oJmNhjefsLIXACgj0otov"
        )
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
    console.log(projectMembers,member);
  };
  /* -------------------------------------------------------------------------- */
  /*                    write projectMembers data to database                   */
  /* -------------------------------------------------------------------------- */
  console.log(member.length);
  function writeProjectMembersData(email) {
    set(ref(database, "project-members/" + member.length), {
      email,
    });
    console.log(member);
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
            mailRef.current.value = "";
          }}
        >
          Invite
        </button>
      </form>
      <p ref={mailError} className="text-danger fs-min"></p>
      </>
  );
}
