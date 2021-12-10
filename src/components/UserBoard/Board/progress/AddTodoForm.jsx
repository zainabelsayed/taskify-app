import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Formik} from "formik";
import FormField from "./FormField";
import FormArray from "./FormArray";
import { database } from "../../../../firebase-config";
import { ref,set } from "firebase/database";

export default function AddTodoForm(props) {
  const { listId, tasks, setTasks, mode, item,projectID, allTasks, setAllTasks } = props;
  const close = useRef();
  /* -------------------------------------------------------------------------- */
  /*                           write data to firebase                           */
  /* -------------------------------------------------------------------------- */
  useEffect(()=>{
    writeTasksData()
  },[tasks])
  function writeTasksData() {
    set(ref(database, "/tasks"), {
      ...allTasks
    });
  }
  let initialValues = {
    taskName: "",
    description: "",
    deadline: "",
    checklist: [],
  };
  /* -------------------------------------------------------------------------- */
  /*                         intial values in edit mode                         */
  /* -------------------------------------------------------------------------- */
  if(mode === "edit"){
     initialValues = {
      taskName: item.taskName,
      description: item.description,
      deadline: item.deadline,
      checklist:item.checklist?item.checklist:[],
    };
  }
  /* -------------------------------------------------------------------------- */
  /*                           on submit form function                          */
  /* -------------------------------------------------------------------------- */
  const onSubmit = (value, { resetForm }) => {
    if(mode === "edit"){
    item.taskName = value.taskName
    item.description = value.description
    item.deadline = value.deadline
    item.checklist = value.checklist
    const newTasks = tasks
    setTasks([...newTasks])
    }
    else{
    const newTodo = { listId, id: uuidv4(), ...value,taskMembers:[],projectID };
    setTasks([...tasks, newTodo]);
    setAllTasks([...allTasks,newTodo])
  }
    close.current.click();
    resetForm();
  };
  return (
    <div className="modal fade" id={`modal${listId}`}>
      <div className="modal-dialog modal-dialog-centered" id={listId}>
        <div className="modal-content border-0 border-rad-1-3rem p-3">
          <div className="modal-header border-0">
            <h5 className="modal-title" id="staticBackdropLabel">
              Task Details
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={close}
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              onSubmit={onSubmit}
              validateOnChange={false}
              render={(formik) => (
                <Form className="was-validated">
                  <FormField
                    values={formik.values}
                    name="taskName"
                    label="Task Name"
                    type="text"
                  />
                  <FormField
                    values={formik.values}
                    name="description"
                    label="Description"
                    type="text"
                  />
                  <FormField
                    values={formik.values}
                    name="deadline"
                    label="Deadline"
                    type="date"
                  />
                  <FormArray formik={formik}/>
                  {mode === "edit"?(
                    <>
                    <button
                    type="submit"
                    className="btn rounded-pill bg-voilet shadow text-white mt-3"
                  >
                    Save
                  </button>
                  <button
                  type="button"
                  className="btn rounded-pill bg-light shadow mt-3 ms-3"
                  onClick={()=>close.current.click()}
                >
                 Cancel
                </button>
                </>
                  ):(
                  <button
                    type="submit"
                    className="btn rounded-pill bg-voilet shadow text-white mt-3"
                  >
                    Add task
                  </button>)
                  }
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
