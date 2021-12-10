import React, { useEffect, useState } from "react";
import moment from "moment";
import { database } from "../../../firebase-config";
import { ref, get, child, set } from "firebase/database";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./UserDashboard.css";
import OverdueTasks from "./OverdueTasks";
import UpcomingDeadLines from "./UpcomingDeadLines";
import TodosCircularBar from "./TodosCircularBar";

export default function UserDashboard(props) {
  const { lists, tasks, projectID } = props;
  const user = sessionStorage.getItem("user");
  const [doneCount, setDoneCount] = useState(0);
  const [percentDone, setPercentDone] = useState(0);
  const [doneId, setDoneId] = useState(null);
  const [users, setUsers ] = useState([])
  /* -------------------------------------------------------------------------- */
  /*                    overdue tasks and upcoming deadlines                    */
  /* -------------------------------------------------------------------------- */
  const [upcoming, setUpcomming] = useState([]);
  const [overdue, setOverdue] = useState([]);
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
        } else {
          delete task.overdue;
          delete task.upcoming;
        }
      } else {
        if (upcomingDate >= 0 && upcomingDate < 4) {
          if (task.list !== "Done") {
            task.upcoming = upcomingDate;
            delete task.overdue;
          } else {
            delete task.overdue;
            delete task.upcoming;
          }
        }
      }

      //to make sure it calculates after it's been added (if yesterday diff was 3 days then today it would be 4 days)

      if (task.overdue) {
        if (diff < 4) {
          task.overdue = diff;
        } else {
          delete task.overdue;
        }
      } else if (task.upcoming) {
        if (upcomingDate < 4) {
          task.upcoming = upcomingDate;
        } else {
          delete task.upcoming;
        }
      }
    }
    const upcomingTasks = tasks.filter((task) => task.upcoming);
    const overdueTasks = tasks.filter((task) => task.overdue);
    setUpcomming([...upcomingTasks]);
    setOverdue([...overdueTasks]);
  };
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
    const dbRef = ref(database);
    get(child(dbRef, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUsers(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
      
  }, []);
  function writeUpdatedUsersData(users) {
    set(ref(database, "/users"), {
      ...users,
    });
  }
  useEffect(()=>{
    if (user && users[user] && percentDone) {
      const [project] = users[user].projects.filter(
        (project) => project.projectID === projectID
      );
      project.percent = percentDone
      writeUpdatedUsersData(users)
    }
  },[users,user,percentDone])
  useEffect(() => {
    updateDiff();
    checkPercentage();
  }, [tasks, lists, percentDone, doneCount, doneId]);

  return (
    <section>
      <TodosCircularBar tasks={tasks} />
      <div className="userDashboard d-none d-lg-block">
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
