import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function TodosCircluarProgressBar(props) {
  const { percent, count, name, className } = props;
  return (
    <div>
      <div className={`px-2 text-center ${className}`}>
        <CircularProgressbar
          className="d-flex justify-content-center py-3
              CircularProgressbar-path-Todo
              CircularProgressbar-text
              CircularProgressbar-trail
              CircularProgressbar-background"
          value={percent}
          text={percent ? `${percent.toFixed(0)}%` : `0%`}
        />
        <h6 className="text-white">
          {name}({count})
        </h6>
      </div>
    </div>
  );
}
