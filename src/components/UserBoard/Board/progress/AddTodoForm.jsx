import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

export default function AddTodoForm(props) {
  const { todo, setTodo } = props;
  const close = useRef()
  const [id, setId] = useState(0);
  const formik = useFormik({
    initialValues: {
      taskName: "",
      description: "",
      duration: 0,
    },
    onSubmit: (value) => {
      setId(id + 1);
      setTodo([...todo, { id: `id${id}`, ...value, percent: 0 }]);
      close.current.click()
      formik.resetForm()
    },
  });
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 border-rad-1-3rem p-3">
          <div className="modal-header border-0">
            <h5 className="modal-title" id="staticBackdropLabel">
              Project Details
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
            <form className="was-validated" onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Task name</label>
                <input
                  type="text"
                  className="form-control border-rad-1-3rem"
                  name="taskName"
                  value={formik.values.taskName}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control border-rad-1-3rem"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Duration</label>
                <div className="d-flex align-items-baseline justify-content-start">
                  <input
                    type="number"
                    className="form-control w-25 border-rad-1-3rem"
                    min="0"
                    max="20"
                    name="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    required
                  />{" "}
                  <p className="w-25 ms-3">Hours</p>
                </div>
              </div>
              <button
                type="submit"
                className="btn rounded-pill bg-voilet shadow text-white"
              >
                Add task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
