import emailjs from "emailjs-com";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addMemberAction } from "../../store/projectMembersStore";
import { removeMemberAction } from "../../store/projectMembersStore"
import { database } from "../../../firebase-config";
import { ref, set, get, child } from "firebase/database";
import ReactTooltip from 'react-tooltip';

import logo from "../../../assets/images/logo.png";
import userImg from "../../../assets/images/user-img.jpg";
import "./BoardHeader.css";

export default function BoardHeader() {
  const dispatch = useDispatch();
  const [invitedMail, setInvitedMail] = useState();
  const [member, setMember] = useState([]);
  const from_name = "Taskify members";
  const project_name = "Graduation Project";
  const mailRef = useRef();
  const mailError = useRef();
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
  /*                getting project members data from redux store               */
  /* -------------------------------------------------------------------------- */
  let projectMembers = useSelector((state) => state.projectMembers);

  /* -------------------------------------------------------------------------- */
  /*                 getting project members data from firebase                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "project-members"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMember(snapshot.val());
          console.log(member, projectMembers);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectMembers]);

  useEffect(() => {
    member.map((member) => {
      if (!projectMembers.includes(member.email)) {
        dispatch(addMemberAction(member.email))
      }
    });
    console.log(member, projectMembers);
  }, [member, projectMembers]);

  console.log(member, projectMembers);
  /* -------------------------------------------------------------------------- */
  /*                       to send the invitation email                       */
  /* -------------------------------------------------------------------------- */
  const sendInvite = (e) => {
    e.preventDefault();
    console.log(projectMembers);
    if (!projectMembers.includes(invitedMail)) {
      dispatch(addMemberAction(invitedMail));
      setMember([...member, { email: invitedMail }]);
      writeProjectMembersData(invitedMail);
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
    console.log(projectMembers);
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
  /* -------------------------------------------------------------------------- */
  /*                            remove project member                           */
  /* -------------------------------------------------------------------------- */
  function writeMembersData() {
    set(ref(database, "/project-members"), {
      ...member,
    });
  }
  const removeMember = (memberMail) => {
    console.log(memberMail.email,memberMail)
      member.splice(member.indexOf(memberMail), 1);
      dispatch(removeMemberAction(memberMail.email))
      const newMembers = member;
      setMember([...newMembers]);
      writeMembersData();
    console.log(member, projectMembers);
  };

  return (
    <div className="my-3 justify-content-between align-items-baseline d-flex">
      <div className="col-md-2">
        <Link
          className="d-flex align-items-center text-decoration-none text-dark"
          to="/"
        >
          <img className="pe-2" src={logo} alt="website logo" />
          <h1 className="d-inline-block logo-font">TASKIFY</h1>
        </Link>
      </div>
      <div className="col-md-2 text-center">
        <h5>Project name</h5>
      </div>
      <div className="col-md-2 justify-content-center d-flex">
      {member.map((memberMail, index) => (
            <div key={index}>
              <button
                type="button"
                className="icon fw-bold shadow-sm border-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id={memberMail.email}
                data-tip
                data-for={memberMail.email}
              >
                <ReactTooltip id={memberMail.email} type="light" border="true" borderColor="#f476a3" place="bottom">
                  <span>{memberMail.email}</span>
                </ReactTooltip>
                {memberMail.email.charAt(0)}
              </button>
              
              <ul class="dropdown-menu">
                <li
                  className="text-danger fs-min ps-2"
                  onClick={(e) => {
                    removeMember(memberMail);
                  }}
                >
                  Remove
                </li>
              </ul>
            </div>
          ))}
      </div>
      <div className="col-md-3 me-1">
        <form
          className="input-group bg-transparent align-items-center"
          onSubmit={(e) => sendInvite(e)}
        >
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
              setTimeout(() => {
                mailRef.current.value = "";
              }, 3000);
            }}
          >
            Invite
          </button>
        </form>
        <p ref={mailError} className="text-danger fs-min"></p>
      </div>
      <div className="profile-width">
        <div className="d-flex align-items-center justify-content-start">
          <figure className="w-25">
            <img className="rounded-circle w-100" src={userImg} alt="" />
          </figure>
          <div className="text-start w-75 ms-3">
            <h6 className="mb-0 fw-bold fs-5">Saffron</h6>
            <p className="text-secondary fs-min">UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
