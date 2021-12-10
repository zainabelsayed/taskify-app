import React, { useEffect, useState } from "react";
import { database } from "../../../firebase-config";
import { ref, set, get, child } from "firebase/database";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import {
  removeMemberAction,
  addMemberAction,
} from "../../redux/projectMembersReducer";

export default function ProjectMembers(props) {
  let {
    setMember,
    member,
    projectMembers,
    projectID,
    allMembers,
    setAllMembers,
  } = props;
  const dispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*                 getting project members data from firebase                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "project-members"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.val().map((member) => {
            if (!projectMembers.includes(member.email) && member.projectID === projectID) {
              dispatch(addMemberAction(member.email));
            }else{
              dispatch(removeMemberAction(member.email))
            }})
          setAllMembers(snapshot.val());
          const newMember = snapshot.val().filter(
            (memberDb) => memberDb.projectID === projectID
          );
          setMember([...newMember]);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    allMembers.map((member) => {
      if (!projectMembers.includes(member.email) && member.projectID === projectID) {
        dispatch(addMemberAction(member.email));
      }
     })
  }, [allMembers,member,projectMembers]);
  /* -------------------------------------------------------------------------- */
  /*                            remove project member                           */
  /* -------------------------------------------------------------------------- */
  function writeMembersData(members) {
    set(ref(database, "/project-members"), {
      ...members,
    });
  }
  const removeMember = (memberMail) => {
    console.log(memberMail.email, memberMail);
    member.splice(member.indexOf(memberMail), 1);
    const updatedMembers= allMembers.filter(item=> item.email !== memberMail.email )
    dispatch(removeMemberAction(memberMail.email));
    setAllMembers([...updatedMembers])
    const newMembers = member;
    setMember([...newMembers]);
    writeMembersData(updatedMembers);
    console.log(projectMembers,allMembers)
  };

  return (
    <div className="d-flex">
      {member?.length > 0
        ? member.map((memberMail, index) => (
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
          ))
        : null}
    </div>
  );
}
