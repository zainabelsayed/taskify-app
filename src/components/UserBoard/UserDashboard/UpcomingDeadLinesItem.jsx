import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
export default function UpcomingDeadLines(props) {
    const{ task, progress, color} = props
  return (
      <>
      <div className="m-0">
          <p className="fs-min m-0 text-start" style={{color:color}}>{task}</p>
          <div className="row align-items-center">
          <div className="col-9">
          <ProgressBar completed={progress} height="0.5rem" bgColor={color} customLabel=" " baseBgColor="#6b6fe8" />
          </div>
          <div className="col-3">
          <span style={{color:color}}>{progress}%</span>
          </div>
          </div>
      </div>
      </>
  );
}