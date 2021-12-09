import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import userImg from "../../../assets/images/user-img.jpg";
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
        <div className="d-flex d-lg-none align-items-center justify-content-lg-start justify-content-end">
          <figure className="w-25">
            <img className="rounded-circle w-100" src={userImg} alt="" />
          </figure>
          <div className="text-start w-75 ms-3 d-none d-md-block">
            <h6 className="mb-0 fw-bold fs-5">Saffron</h6>
            <p className="text-secondary fs-min">UI/UX Designer</p>
          </div>
        </div>
      </div>
      <div className="text-lg-center project-name text-start py-3 py-lg-0">
        <h5>Project name</h5>
      </div>
      <div className="project-name">
      <InvitationForm/>
      </div>
      <div className="profile-width d-none d-lg-block">
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
