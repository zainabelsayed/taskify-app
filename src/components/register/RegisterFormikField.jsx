import React from "react";
import { Field } from "formik";
import RegisterFormikErrorMessage from "./RegisterFormikErrorMessage";

const RegisterFormikField = ({ name, type, label }) => {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <>
            <span className="label-input100">{label}</span>
            <input
              className="input100"
              type={type}
              name={name}
              {...formikField.field}
              defaultChecked={formikField.field.value}
            />
          </>
        );
      }}
    </Field>
  );
};

export default RegisterFormikField;