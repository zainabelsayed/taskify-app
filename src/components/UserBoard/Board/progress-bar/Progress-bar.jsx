import React from "react";
import { useEffect } from "react/cjs/react.development";
import "./Progress-bar.css"
const ProgressBar = ({percent,colorClass,bgColor}) => {
	const [style, setStyle] = React.useState({});
	
	useEffect(()=>{
		setTimeout(() => {
			const newStyle = {
				opacity: 1,
				width: `${percent}%`,
			}
			
			setStyle(newStyle);
		}, 200);
	},[percent])
	
	
	return (
		<div className="progress" style={{backgroundColor:bgColor}}>
			<div className={`progress-done ${colorClass}`} style={style}>
			</div>
		</div>
	)
}

export default ProgressBar;