import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import ProjectCards from "../cards/ProjectCards";
import AddTodoProjectForm from "./AddTodoProjectForm";
import { getDatabase, ref, child, get, set } from "firebase/database";
import HashLoader from "react-spinners/HashLoader";

export default function Todo() {
  const [todo, setTodo] = useState([]);
  const [loaded, setLoaded] = useState(false);

  var category = useParams().category;
  if (category === undefined) category = "Work";

  const addInvitedProject = (id, value) => {
    const userName = sessionStorage.getItem("user");
    set(ref(getDatabase(), `users/${userName}/projects/` + id), {
      projectID: value.projectID,
      projectName: value.projectName,
      description: value.description,
      category: value.category,
      duration: value.duration,
      whatsapp: value.whatsapp,
      percent: value.percent,
    });

    setTodo([
      ...todo,
      {
        name: id,
        data: {
          projectID: value.projectID,
          projectName: value.projectName,
          description: value.description,
          category: value.category,
          duration: value.duration,
          whatsapp: value.whatsapp,
          percent: value.percent,
        },
      },
    ]);
  };

  get(child(ref(getDatabase()), `project-members/`))
    .then((invitedMembers) => {
      if (invitedMembers !== undefined) {
        const arr = [];
        const userName = sessionStorage.getItem("user");
        Object.keys(invitedMembers.val()).forEach((key) =>
          arr.push({
            name: key,
            data: invitedMembers.val()[key],
          })
        );
        get(child(ref(getDatabase()), `users/${userName}/`))
          .then((result) => {
            if (result !== undefined) {
              let email = "";
              let invitedProjectsID = [];
              Object.keys(result.val()).forEach((key) => {
                if (key === "email") email = result.val()[key];
              });
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].data.email === email) {
                  invitedProjectsID.push(arr[i].data.projectID);
                }
              }
              get(child(ref(getDatabase()), `users/`))
                .then((users) => {
                  if (users !== undefined) {
                    const invitedProjects = [];
                    Object.keys(users.val()).forEach((key) => {
                      if (users.val()[key].projects !== undefined) {
                        for (let j = 0; j < invitedProjectsID.length; j++) {
                          users.val()[key].projects.forEach((elem) => {
                            if (elem.projectID === invitedProjectsID[j]) {
                              invitedProjects.push(elem);
                            }
                          });
                        }
                      }
                    });

                    get(
                      child(ref(getDatabase()), `users/${userName}/projects/`)
                    )
                      .then((currentProjects) => {
                        let id = 0;
                        if (currentProjects !== undefined) {
                          if (currentProjects.val() === null) {
                            invitedProjects.forEach((proj) => {
                              addInvitedProject(id, proj);
                              id++;
                            });
                          } else {
                            id = currentProjects.val().length + 1;
                            invitedProjects.forEach((proj) => {
                              if (
                                currentProjects
                                  .val()
                                  .filter(
                                    (elem) => elem.projectID === proj.projectID
                                  ).length === 0
                              ) {
                                addInvitedProject(id, proj);
                                id++;
                              }
                            });
                          }
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
    const userName = sessionStorage.getItem("user");
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userName}/projects/`))
      .then((snapshot) => {
        if (snapshot !== undefined) {
          const arr = [];
          Object.keys(snapshot.val()).forEach((key) =>
            arr.push({
              name: key,
              data: snapshot.val()[key],
            })
          );
          setTodo(arr);
        }
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setLoaded(true);
      });
  }, []);

  return (
    <div
      className="d-flex flex-row flex-wrap"
      id="todo"
      style={{ columnGap: "0.5em" }}
    >
      {loaded ? (
        <>
          {todo.map(
            (item) =>
              item.data.category === category && (
                <div
                  key={item.name}
                  className="col-md-4"
                  style={{ width: "32%" }}
                >
                  <ProjectCards
                    item={item}
                    setTodo={setTodo}
                    todo={todo}
                    progressColor="progress-todo"
                    textColor="text-todo"
                    percent={item.data.percent}
                  />
                </div>
              )
          )}

          <div className="bg-white d-flex align-items-center justify-content-center py-4 shadow border-rad-1-3rem col-md-4 my-auto mx-0">
            <button
              className="fw-bold todo-plus rounded-circle"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              +
            </button>
          </div>
          <AddTodoProjectForm todo={todo} setTodo={setTodo} />
        </>
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
    </div>
  );
}
