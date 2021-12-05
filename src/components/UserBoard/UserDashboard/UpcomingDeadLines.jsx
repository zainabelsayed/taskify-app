import React , { useRef } from "react";
import { useEffect } from "react";
import UpcomingDeadLinesItem from "./UpcomingDeadLinesItem";

export default function UpcomingDeadLines(props) {
  const { tasks, upcoming } = props;
  useEffect(()=>{
    console.log(upcoming)
  },[upcoming])
  return (
      <div className="text-start text-white userDashboard mt-2 p-3">
        <h6 className="pb-2">Upcoming Deadlines</h6>
        <div>
        {upcoming?.length > 0 ? tasks.map((item, index) => {
          if(item.upcoming && item.list !== "Done"){
          return(
          <UpcomingDeadLinesItem key={item.id}
            task={item.taskName}
            percent={item.percent}
            progressColor={`${item.list} Todo`}
            textColor={`text-${item.list} text-Todo`}
            upcoming= {item.upcoming}
          />)
          
          }}):(
          <p className="text-Doing">You have no upcoming deadlines!</p>
        )}
        </div>
      </div>
        );
}
