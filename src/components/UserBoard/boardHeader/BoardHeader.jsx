import React, { useEffect, useState } from "react";
import { database } from "../../../firebase-config";
import { ref, get, child } from "firebase/database";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import UserProjectDashboard from "../UserDashboard/UserProjectDashboard";
import "./BoardHeader.css";
import InvitationForm from "./InvitationForm";

export default function BoardHeader(props) {
  const [users, setUsers] = useState([]);
  const [projectName, setProjectName] = useState();
  const { projectID } = props;
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUsers(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    if (user && users[user]) {
      const [project] = users[user].projects.filter(
        (project) => project.projectID === projectID
      );
      setProjectName(project.projectName);
      console.log(projectName);
    }
  }, [users, user]);

  return (
    <div className="my-3 justify-content-between align-items-center d-lg-flex">
      <div className="header-bar d-flex justify-content-between">
        <Link
          className="d-flex align-items-center text-decoration-none text-dark"
          to="/"
        >
          <img className="pe-2" src={logo} alt="" />
          <h1 className="d-inline-block logo-font">TASKIFY</h1>
        </Link>
        <div className="d-flex d-lg-none w-50">
          <UserProjectDashboard />
        </div>
      </div>
      <div className="text-lg-center project-name text-start py-3 py-lg-0">
        <h5>{projectName}</h5>
      </div>
      <div className="project-name">
        <InvitationForm projectID={projectID} />
      </div>
      <div className="profile-width d-none d-lg-block">
        <UserProjectDashboard />
      </div>
    </div>
  );
}
