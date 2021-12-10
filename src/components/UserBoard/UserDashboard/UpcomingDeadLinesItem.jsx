import React from "react";
import ProgressBar from "./../Board/progress-bar/Progress-bar";

export default function UpcomingDeadLinesItem(props) {
  const { percent, progressColor, textColor, task, upcoming } = props;
  return (
    <>
      <div className="m-0">
        <div className={`d-flex justify-content-between mb-2 ${textColor}`}>
          <p className="p-0 m-0 fs-min">{task}</p>
          <p className="p-0 m-0 fs-min">
            {upcoming} {upcoming > 1 ? "days" : "day"} left
          </p>
        </div>
        {percent ? (
          <div className="row align-items-center">
            <div className="col-9 m-0">
              <ProgressBar
                percent={percent}
                colorClass={progressColor}
                bgColor="#6b6fe8"
              />
            </div>
            <div className="col-3">
              <span className={`${textColor}`}>{percent}%</span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
