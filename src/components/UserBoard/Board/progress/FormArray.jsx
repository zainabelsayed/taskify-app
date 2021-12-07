import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FieldArray, Field } from "formik";

export default function FormArray(props) {
  const { formik } = props;
  let timer,
    timeoutVal = 1000;
  function handleKeyPress() {
    window.clearTimeout(timer);
  }
  return (
    <FieldArray
      name="checklist"
      render={(arrayHelpers) => (
        <div>
          {formik.values.checklist && formik.values.checklist.length > 0 ? (
            formik.values.checklist.map((checklist, index) => (
              <div key={index}>
                <Field name={`checklist[${index}].title`}>
                  {(formikFieldChecklist) => {
                    return (
                      <div className="d-flex justify-content-start align-items-center w-75">
                        {formikFieldChecklist.field.value ? (
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faList} />
                            <p className="m-0 ps-2">
                              {formikFieldChecklist.field.value}
                            </p>
                          </div>
                        ) : (
                          <div className="input-group bg-transparent mt-3">
                            <>
                              <input
                                type="text"
                                className="form-control rounded-pill input-head"
                                placeholder={`Add Checklist Title`}
                                name={formikFieldChecklist.field.name}
                                onBlur={formik.handleBlur}
                                onKeyPress={handleKeyPress}
                                onKeyUp={(e) => {
                                  window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
                                  timer = window.setTimeout(() => {
                                    formik.setFieldValue(
                                      formikFieldChecklist.field.name,
                                      e.target.value
                                    );
                                  }, timeoutVal);
                                }}
                                required
                              />
                            </>
                          </div>
                        )}

                        <button
                          className="btn hover-transparent"
                          id="basic-addon2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Delete Checklist"
                          type="button"
                          onClick={() => {
                            arrayHelpers.remove(index);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-danger"
                          />
                        </button>
                        <button
                          className="input-group-text btn bg-transparent hover-transparent"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Add Another Checklist"
                          id="basic-addon2"
                          type="button"
                          onClick={() => {
                            arrayHelpers.insert(index, "");
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="text-secondary"
                          />
                        </button>
                      </div>
                    );
                  }}
                </Field>
                {formik.values.checklist[index].title ? (
                  <FieldArray
                    name={`checklist[${index}].items`}
                    render={(itemsArrayHelper) => (
                      <div>
                        {formik.values.checklist[index].items &&
                        formik.values.checklist[index].items.length > 0 ? (
                          formik.values.checklist[index].items.map(
                            (item, indx) => (
                              <div key={indx}>
                                <Field
                                  name={`checklist[${index}].items[${indx}].item`}
                                >
                                  {(formikField) => {
                                    return (
                                      <div className="d-flex justify-content-start align-items-baseline w-50">
                                        {formikField.field.value ? (
                                          <Field
                                            name={`checklist[${index}].items[${indx}].status`}
                                          >
                                            {(formikStatus) => {
                                              return (
                                                <div
                                                  className="form-check fs-min m-0"
                                                  key={indx}
                                                >
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    {...formikStatus.field}
                                                  />
                                                  <label
                                                    className={
                                                      formikStatus.field.value
                                                        ? `form-check-label text-decoration-line-through`
                                                        : `form-check-label`
                                                    }
                                                    htmlFor="flexCheckDefault"
                                                  >
                                                    {formikField.field.value}
                                                  </label>
                                                </div>
                                              );
                                            }}
                                          </Field>
                                        ) : (
                                          <div className="input-group bg-transparent my-2">
                                            <input
                                              type="text"
                                              className="form-control rounded-pill input-head"
                                              placeholder={`Add Item`}
                                              name={formikField.field.name}
                                              onBlur={formik.handleBlur}
                                              onKeyPress={handleKeyPress}
                                              onKeyUp={(e) => {
                                                window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
                                                timer = window.setTimeout(
                                                  () => {
                                                    formik.setFieldValue(
                                                      formikField.field.name,
                                                      e.target.value
                                                    );
                                                  },
                                                  timeoutVal
                                                );
                                              }}
                                              required
                                            />
                                          </div>
                                        )}

                                        <button
                                          className="btn hover-transparent"
                                          id="basic-addon2"
                                          type="button"
                                          onClick={() => {
                                            itemsArrayHelper.remove(indx);
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={faTrash}
                                            className="text-danger"
                                          />
                                        </button>
                                        <button
                                          className="input-group-text btn bg-transparent hover-transparent"
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title="Add Another Checklist"
                                          id="basic-addon2"
                                          type="button"
                                          onClick={() => {
                                            itemsArrayHelper.insert(indx, "");
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={faPlus}
                                            className="text-secondary"
                                          />
                                        </button>
                                      </div>
                                    );
                                  }}
                                </Field>
                              </div>
                            )
                          )
                        ) : (
                          <button
                            type="button"
                            className="btn bg-voilet rounded-pill text-white my-3"
                            onClick={() => itemsArrayHelper.push("")}
                          >
                            {/* show this when user has removed all friends from the list */}
                            Add Item
                          </button>
                        )}
                      </div>
                    )}
                  />
                ) : null}
              </div>
            ))
          ) : (
            <button
              type="button"
              className="btn bg-voilet rounded-pill text-white mb-3"
              onClick={() => arrayHelpers.push("")}
            >
              {/* show this when user has removed all friends from the list */}
              Add checklist
            </button>
          )}
        </div>
      )}
    />
  );
}
