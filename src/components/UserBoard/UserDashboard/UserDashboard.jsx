import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./UserDashboard.css";
import userImg from "../../../assets/images/user-img.jpg";
import OverdueTasks from "./OverdueTasks";
import UpcomingDeadLines from "./UpcomingDeadLines";
export default function UserDashboard() {
  return (
    <section>
      <div className="userProfile mb-2">
        <div className="d-flex align-items-center justify-content-between">
          <figure className="w-25">
            <img className="rounded-circle w-100" src={userImg} alt="" />
          </figure>
          <div className="text-start w-75 ms-3">
            <h6 className="mb-0 fw-bold fs-5">Saffron</h6>
            <p className="text-secondary fs-min">UI/UX Designer</p>
          </div>
        </div>
      </div>
      <div className="userDashboard">
        <div className="precentage-progress px-4 py-1 text-center">
          <CircularProgressbar
            className="d-flex justify-content-center py-3
            CircularProgressbar-path
            CircularProgressbar-text
            CircularProgressbar-trail
            CircularProgressbar-background "
            value={80}
            text={`${80}%`}
          />
          <h6 className="text-white">Performance of the week</h6>
          <p className="text-cyan">8 of 10 completed Successfuly</p>
        </div>
      </div>
      <UpcomingDeadLines/>
      <OverdueTasks/>
    </section>
  );
}
