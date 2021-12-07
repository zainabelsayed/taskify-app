import React from "react";

export default function Overdue(props) {
    const {textColor, task,overdue} = props
  return (
    <>
      <div className={`d-flex justify-content-between mb-2 ${textColor}`}>
        <p className="p-0 m-0 fs-min">{task}</p>
        <p className="p-0 m-0 fs-min">{overdue} {overdue > 1 ? "days" : "day"} ago</p>
      </div>
    </>
  );
}
