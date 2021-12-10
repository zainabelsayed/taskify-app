import { useEffect, useState } from "react/cjs/react.development";
import { DragDropContext } from "react-beautiful-dnd";
import { ref, get, child } from "firebase/database";
import HashLoader from "react-spinners/HashLoader";
import { database } from "../../../../firebase-config";
import "./Progress.css";
import AddList from "./AddList";
import List from "./List";
import UserDashboard from "../../UserDashboard/UserDashboard";

function Progress() {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);
  /* -------------------------------------------------------------------------- */
  /*                getting data from firebase realtime database                */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "lists"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLists(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    get(child(dbRef, "tasks"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setTasks(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    }
  };

  return (
    <>
      <div className="py-2 d-flex progress-responsive justify-content-between align-items-start">
        {lists?.length > 0 ? (
          <div className="board-width tasks-board me-3 bg-grey py-3 px-4 border-rad-1-3rem">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <div className="row flex-row flex-nowrap board bg-transparent">
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
                  />
                ))}
                <AddList lists={lists} setLists={setLists} />
              </div>
            </DragDropContext>
          </div>
        ) : (
          <div style={{ padding: "12rem 30rem" }}>
            <HashLoader
              color={"#595de5"}
              loading={true}
              css={""}
              size={50}
              speedMultiplier={1}
            />
          </div>
        )}
        <div className="catergory-and-dashboard-width">
          <UserDashboard lists={lists} tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}
export default Progress;
