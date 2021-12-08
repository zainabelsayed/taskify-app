import React from "react";
import "./TaskifyNumbers.css";
import dashboardImg from "../../../assets/images/Taskify dashboard.png";
import dashboardImgPart1 from "../../../assets/images/Taskify dashboard-1.png";
import CounterItem from "./CounterItem";
export default function TaskifyNumbers() {
  return (
    <section className="mt-0 pt-0 my-md-5 py-md-5">
      <div className="container py-5">
        <div className="row pt-5">
          <div className="col-md-6">
            <h2 className="fs-1 text-start fw-bolder pb-5 head-hight">
              Let's see Taskify <pre></pre> in numbers
            </h2>
            <p className="text-secondary text-start">
              View task updates in real time, monitor key metrics and keep
              everthing on track. Our dashboards automatically detects project
              data in easy to read simple view, and a user friendly user
              interface with no hassle.
            </p>
            <div className="row pt-5 text-center">
              <CounterItem start={0} end={13000} itemName="Active Users"/>
              <CounterItem start={0} end={20000} itemName="Projects"/>
              <CounterItem start={0} end={5000} itemName="Teams"/>
            </div>
          </div>
          <div className="col-md-6 pt-5">
            <figure className="d-flex justify-content-center justify-content-lg-end">
              <img className="image-border shadow" src={dashboardImg} alt="" />
            </figure>
            <figure className="d-flex justify-content-center justify-content-lg-end">
              <img
                className="image-border shadow"
                src={dashboardImgPart1}
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
