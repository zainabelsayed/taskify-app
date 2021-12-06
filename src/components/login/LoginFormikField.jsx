import React from "react";
import { Field } from "formik";

const LoginFormikField = ({ name, type, label, placeholder }) => {
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
              placeholder={placeholder}
              {...formikField.field}
              defaultChecked={formikField.field.value}
            />
          </>
        );
      }}
    </Field>
  );
};

export default LoginFormikField;