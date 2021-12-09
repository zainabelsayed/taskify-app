import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import userImg from "../../../assets/images/user-img.jpg";
import UserProjectDashboard from "../UserDashboard/UserProjectDashboard";
import "./BoardHeader.css";
import InvitationForm from "./InvitationForm";


export default function BoardHeader() {
 
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
        <UserProjectDashboard/>
        </div>
      </div>
      <div className="text-lg-center project-name text-start py-3 py-lg-0">
        <h5>Project name</h5>
      </div>
      <div className="project-name">
      <InvitationForm/>
      </div>
      <div className="profile-width d-none d-lg-block">
       <UserProjectDashboard/>
      </div>
    </div>
  );
}
