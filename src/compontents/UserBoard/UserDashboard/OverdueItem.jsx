import React from "react";

export default function Overdue(props) {
    const {color, task, days} = props
  return (
    <>
      <div className="d-flex justify-content-between mb-2" style={{color:color}}>
        <p className="p-0 m-0">{task}</p>
        <p className="p-0 m-0">{days}days</p>
      </div>
    </>
  );
}
