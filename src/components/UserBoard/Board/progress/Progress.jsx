import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ref, get, child } from "firebase/database";
import HashLoader from "react-spinners/HashLoader";
import { database } from "../../../../firebase-config";
import "./Progress.css";
import AddList from "./AddList";
import List from "./List";
import UserDashboard from "../../UserDashboard/UserDashboard";

function Progress(props) {
  const { projectID } = props;
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [allLists, setAllLists] = useState([]);
  const [allTasks, setAllTasks ] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  /* -------------------------------------------------------------------------- */
  /*                getting data from firebase realtime database                */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "lists"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllLists(snapshot.val());
      const newLists = snapshot.val().filter((list) => list.projectID === projectID);
          setLists([...newLists])
          setIsLoading(true)
          console.log(isLoading,allLists,lists)
        } else {
          console.log("No data available");
          setIsLoading(true)
          console.log(isLoading,allLists,lists)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    get(child(dbRef, "tasks"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllTasks(snapshot.val());
          const newTasks = snapshot.val().filter(task=> task.projectID === projectID)
          setTasks([...newTasks])
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(tasks, allTasks);
  /* -------------------------------------------------------------------------- */
  /*                          handle on drag end event                          */
  /* -------------------------------------------------------------------------- */
  const handleOnDragEnd = (result) => {
    /* -------------------------------------------------------------------------- */
    /*        // if dragged out of a dropper return to its orginal position       */
    /* -------------------------------------------------------------------------- */
    if (!result.destination) return;
    /* -------------------------------------------------------------------------- */
    /*                       // if dragged in the same list                       */
    /* -------------------------------------------------------------------------- */
    if (result.destination.droppableId === result.source.droppableId) {
      const cardsItems = lists.map((list) => {
        if (list.listId === result.destination.droppableId) {
          const items = Array.from(tasks);
          const [reorderedItems] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reorderedItems);
          setTasks([...items]);
        }
        return list;
      });
      setLists([...cardsItems]);
    }
    /* -------------------------------------------------------------------------- */
    /*                           drag item between lists                          */
    /* -------------------------------------------------------------------------- */
    if (result.destination.droppableId !== result.source.droppableId) {
      const tasksReorder = tasks.map((task) => {
        if (task.id === result.draggableId) {
          task.listId = result.destination.droppableId;
        }
        for (let list of lists) {
          if (list.listId === task.listId) {
            task.list = list.title;
          }
        }
        return task;
      });
      setTasks([...tasksReorder]);
      const allTasksReorder = allTasks.map((task) => {
        if (task.id === result.draggableId) {
          task.listId = result.destination.droppableId;
        }
        for (let list of lists) {
          if (list.listId === task.listId) {
            task.list = list.title;
          }
        }
        return task;
      });
      setAllTasks([...allTasksReorder])

    }
  };

  return (
    <>
      <div className="py-2 d-flex progress-responsive justify-content-between align-items-start">
        {isLoading?(
        <div className="board-width tasks-board me-3 bg-grey py-3 px-4 border-rad-1-3rem">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="row flex-md-wrap flex-lg-nowrap board bg-transparent">
              {lists.map((list, index) => (
                <List
                  key={list.listId}
                  id={list.listId}
                  listTitle={list.title}
                  listTheme={list.title}
                  lists={lists}
                  setLists={setLists}
                  tasks={tasks}
                  setTasks={setTasks}
                  projectID={projectID}
                  allLists={allLists}
                  setAllLists={setAllLists}
                  allTasks={allTasks}
                  setAllTasks={setAllTasks}
                />
              ))}
              <AddList
                lists={lists}
                setLists={setLists}
                projectID={projectID}
                allLists={allLists}
                setAllLists={setAllLists}
              />
            </div>
          </DragDropContext>
        </div>
        )
        :(
        <div style={{padding:"12rem 30rem"}}>
        <HashLoader
        color={"#595de5"} loading={true} css={""} size={50} speedMultiplier={1} />
        </div>
        )
        }
        <div className="catergory-and-dashboard-width">
          <UserDashboard
            lists={lists}
            tasks={tasks}
            setTasks={setTasks}
            projectID={projectID}
          />
        </div>
      </div>
    </>
  );
}
export default Progress;
