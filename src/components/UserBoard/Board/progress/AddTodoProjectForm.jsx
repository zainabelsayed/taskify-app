import React, { useRef } from "react";
import { useFormik } from "formik";
import { getDatabase, ref, set, get, child, update } from "firebase/database";
import { useDispatch } from "react-redux";
import { incrementNum } from "../../../redux/CounterRedux";
import { v4 as uuidv4 } from "uuid";

export default function AddTodoProjectForm(props) {
  const { todo, setTodo } = props;
  const close = useRef();
  const userName = sessionStorage.getItem("user");
  const dispatch = useDispatch();

  const createProject = (id, value) => {
    let projectId = uuidv4();
    set(ref(getDatabase(), `users/${userName}/projects/` + id), {
      projectID: projectId,
      projectName: value.projectName,
      description: value.description,
      category: value.category,
      duration: value.duration,
      whatsapp: value.whatsapp,
      percent: 0,
    });

    setTodo([
      ...todo,
      {
        name: id,
        data: {
          projectID: projectId,
          projectName: value.projectName,
          description: value.description,
          category: value.category,
          duration: value.duration,
          whatsapp: value.whatsapp,
          percent: 0,
        },
      },
    ]);
  };

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      category: "Work",
      duration: 0,
      whatsapp: false,
      mobile: "",
    },
    onSubmit: (value) => {
      dispatch(incrementNum(value.category));
      const userMobile = formik.values.mobile;
      update(ref(getDatabase(), "users/" + userName), {
        mobile: userMobile,
      });

      get(child(ref(getDatabase()), `users/${userName}/projects/`))
        .then((snapshot) => {
          let id = 0;
          if (snapshot !== undefined) {
            const arr = [];
            Object.keys(snapshot.val()).forEach((key) =>
              arr.push({
                name: key,
                data: snapshot.val()[key],
              })
            );
            id = parseInt(arr[arr.length - 1].name) + 1;
          }
          createProject(id, value);
        })
        .catch((error) => {
          console.log(error);
          if (todo.length === 0) {
            createProject(0, value);
          }
        });

      close.current.click();
      formik.resetForm();
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
                <label className="form-label">Project name</label>
                <input
                  type="text"
                  className="form-control border-rad-1-3rem"
                  name="projectName"
                  value={formik.values.projectName}
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
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formik.values.category}
                  required
                  onChange={formik.handleChange}
                  className="form-control border-rad-1-3rem"
                >
                  <option value="Work">Work</option>
                  <option value="Family">Family</option>
                  <option value="Personal">Personal</option>
                  <option value="Business">Business</option>
                  <option value="Friends">Friends</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Duration</label>
                <div className="d-flex align-items-baseline justify-content-start">
                  <input
                    type="number"
                    className="form-control w-25 border-rad-1-3rem"
                    min="1"
                    name="duration"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    required
                  />{" "}
                  <p className="w-25 ms-3">Months</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label fs-5 fw-bold">Other Apps</label>
                <div className="d-flex align-items-baseline justify-content-start mb-3">
                  <input
                    type="checkbox"
                    name="whatsapp"
                    value={formik.values.whatsapp}
                    onChange={formik.handleChange}
                    className="me-2"
                  />
                  WhatsApp
                </div>
                {formik.values.whatsapp && (
                  <div className="mb-5">
                    <label className="form-label">Mobile Number</label>
                    <div className="d-flex align-items-baseline justify-content-start">
                      <input
                        type="text"
                        className="form-control border-rad-1-3rem"
                        minLength="11"
                        maxLength="11"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        pattern="^01[0125][0-9]{8}$"
                        required
                      />
                    </div>
                    {(!formik.values.mobile.match(/^01[0125][0-9]{8}$/) ||
                      formik.values.mobile.length !== 11) && (
                      <p className="mt-3 text-danger">
                        Phone number is not valid
                      </p>
                    )}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn rounded-pill bg-voilet shadow text-white"
              >
                Add Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
