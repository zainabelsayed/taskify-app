import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import taskifyImg from "../../../assets/images/Taskify user board.png";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="bg-gradientt pb-5">
      <div className="container pt-5 pb-5">
        <div className="row pt-5">
          <div className="col-md-6 text-start text-white pt-5">
            <h1 className="pb-4">Tired of going to workspaces?</h1>
            <h3 className="pb-4 line-height">
            Try our Virtual Workspace! <pre></pre>
              Don't worry it's <span className="color-primary fs-1">FREE!</span>
            </h3>
            <p className="pt-3 text-white">
              <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
              Track your projects in real time with live data
            </p>
            <p className="text-white">
              <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
              Meet your team members with your favorite video app.
            </p>
            <p className="text-white">
              <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
              Monitor tasks and teams with easy to read graphs.
            </p>
            <div className="row">
              <div className="col-lg-6">
                <div className="input-group mb-3 mt-5 bg-transparent pb-5">
                  <input
                    type="email"
                    className="form-control rounded-pill p-input border-white border text-white"
                    placeholder="Your email"
                  />
                  <span
                    className="input-group-text rounded-pill m-in text-white"
                    id="basic-addon2"
                  >
                    Try for free
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <figure className="hero-image d-none d-md-block">
              <img
                className="border border-1 border-white rounded-3 shadow-lg"
                src={taskifyImg}
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
