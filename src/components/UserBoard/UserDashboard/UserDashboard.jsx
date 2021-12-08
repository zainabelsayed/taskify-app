import React, { useEffect, useState } from "react";
import moment from "moment";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./UserDashboard.css";
import OverdueTasks from "./OverdueTasks";
import UpcomingDeadLines from "./UpcomingDeadLines";

export default function UserDashboard(props) {
  const { lists, tasks, setTasks } = props;
  const [doneCount, setDoneCount] = useState(0);
  const [percentDone, setPercentDone] = useState(0);
  const [doneId, setDoneId] = useState(null);
  /* -------------------------------------------------------------------------- */
  /*                    overdue tasks and upcoming deadlines                    */
  /* -------------------------------------------------------------------------- */
  const [ upcoming, setUpcomming ] = useState([])
  const [ overdue, setOverdue ] = useState([])
  const today = moment();

  const updateDiff = () => {
    for (let task of tasks) {
      const taskDeadline = moment(task.deadline);
      const diff = parseInt(today.diff(taskDeadline, "days"));
      const upcomingDate = parseInt(diff) * -1 + 1;
      
      for (let list of lists) {
        if (list.listId === task.listId) {
          task.list = list.title;
        }
      }
      //if +ve -> overdue, if -ve -> upcoming
      // overdue
      if (diff > 0 && diff <= 3) {
        // check if he deleted something
        if (task.list !== "Done") {
            task.overdue = diff;
            delete task.upcoming;
        }else{
          delete task.overdue
          delete task.upcoming
        }
      } else {
       
        if (upcomingDate >= 0 && upcomingDate < 4) {
          if (task.list !== "Done") {
              task.upcoming = upcomingDate;
                delete task.overdue;
            }else{
              delete task.overdue
              delete task.upcoming
            }
          } 
          console.log(upcomingDate);
        }

        //to make sure it calculates after it's been added (if yesterday diff was 3 days then today it would be 4 days)
        
        if(task.overdue){
          if(diff < 4){
            task.overdue = diff;
          }
          else{
            delete task.overdue;
          }
        }
        else if(task.upcoming){
          if(upcomingDate < 4 ){
            task.upcoming = upcomingDate;
          }
          else{
            delete task.upcoming;
          }
        }
      
    }
    console.log(tasks);
    const upcomingTasks = tasks.filter(task=> task.upcoming)
    const overdueTasks = tasks.filter(task => task.overdue)
    setUpcomming([...upcomingTasks])
    setOverdue([...overdueTasks])
  };
  
  console.log(upcoming,overdue)
  /* -------------------------------------------------------------------------- */
  /*                        update performance percentage                       */
  /* -------------------------------------------------------------------------- */
  const checkPercentage = () => {
    if (lists) {
      for (let list of lists) {
        if (list.title === "Done") {
          setDoneId(list.listId);
        }
      }
      let result = tasks.filter((obj) => {
        return obj.listId === doneId;
      });

      setDoneCount(result.length);
      setPercentDone((doneCount / tasks.length) * 100);
    }
  };

  useEffect(() => {
    updateDiff();
    checkPercentage();
  }, [tasks, lists, percentDone, doneCount, doneId]);
  
  return (
    <section>
      <div className="userDashboard">
        <div className="precentage-progress px-4 py-1 text-center">
          <CircularProgressbar
            className="d-flex justify-content-center py-3
            CircularProgressbar-path
            CircularProgressbar-text
            CircularProgressbar-trail
            CircularProgressbar-background"
            value={percentDone}
            text={percentDone ? `${percentDone.toFixed(0)}%` : `0%`}
          />
          <h6 className="text-white">Project Performance</h6>
          <p className="text-cyan">
            {doneCount} of {tasks?.length} completed Successfuly
          </p>
        </div>
      </div>
      <UpcomingDeadLines
        lists={lists}
        tasks={tasks}
        upcoming={upcoming}
        doneId={doneId}
      />
      <OverdueTasks lists={lists} tasks={tasks} overdue={overdue} />
    </section>
  );
}
