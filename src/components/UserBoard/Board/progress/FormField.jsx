import React from "react";
import { Field } from "formik";

export default function FormField(props) {
  const { name, label, type } = props;
  const date = new Date()
  const minDate = date.toISOString().substring(0,10);
  return (
    <>
      <Field name={name}>
        {(formikField) => {
          return (
            <>
              <div className="mb-3">
                <label className="form-label">{label}</label>
                {type === "date"?
                <input
                type={type}
                // min={minDate}
                className="form-control border-rad-1-3rem"
                name={name}
                {...formikField.field}
                required
              />:<input
              type={type}
              className="form-control border-rad-1-3rem"
              name={name}
              {...formikField.field}
              required
            />}
              </div>
            </>
          );
        }}
      </Field>
    </>
  );
}
