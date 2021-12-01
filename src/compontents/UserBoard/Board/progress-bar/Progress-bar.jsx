import React from "react";
import "./Progress-bar.css";
const ProgressBar = ({ percent, colorClass }) => {
  // const [style, setStyle] = React.useState({});

  // setTimeout(() => {
  // 	const newStyle = {
  // 		opacity: 1,
  // 		width: `${percent}%`,
  // 	}

  // 	setStyle(newStyle);
  // }, 200);

  const style = {
    opacity: 1,
    width: `${percent}%`,
  };

  return (
    <div className="progress">
      <div className={`progress-done ${colorClass}`} style={style}></div>
    </div>
  );
};

export default ProgressBar;
