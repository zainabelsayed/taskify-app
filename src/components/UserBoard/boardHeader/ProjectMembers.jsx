import React, { useEffect } from "react";
import { database } from "../../../firebase-config";
import { ref, set, get, child } from "firebase/database";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import {
  removeMemberAction,
  addMemberAction,
} from "../../redux/projectMembersReducer";

export default function ProjectMembers(props) {
  const { setMember, member, projectMembers } = props;
  const dispatch = useDispatch();
  console.log(member, projectMembers);
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
    member.forEach((member) => {
      if (!projectMembers.includes(member.email)) {
        dispatch(addMemberAction(member.email));
      }
    });
    console.log(member, projectMembers);
  }, []);

  // useEffect(() => {
  //   member.map((member) => {
  //     if (!projectMembers.includes(member.email)) {
  //       dispatch(addMemberAction(member.email));
  //     }
  //   });
  //   console.log(member, projectMembers);
  // }, [member, projectMembers]);

  console.log(member, projectMembers);
  /* -------------------------------------------------------------------------- */
  /*                            remove project member                           */
  /* -------------------------------------------------------------------------- */
  function writeMembersData() {
    set(ref(database, "/project-members"), {
      ...member,
    });
  }
  const removeMember = (memberMail) => {
    console.log(memberMail.email, memberMail);
    member.splice(member.indexOf(memberMail), 1);
    dispatch(removeMemberAction(memberMail.email));
    const newMembers = member;
    setMember([...newMembers]);
    writeMembersData();
    console.log(member, projectMembers);
  };

  return (
    <div className="d-flex">
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
            {memberMail.email.charAt(0)}
          </button>
          <ReactTooltip
            id={memberMail.email}
            type="light"
            border="true"
            borderColor="#f476a3"
            place="bottom"
          >
            <span>{memberMail.email}</span>
          </ReactTooltip>
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
  );
}
