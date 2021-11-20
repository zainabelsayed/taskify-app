import React from "react";
import { ErrorMessage } from "formik";

const RegisterFormikErrorMessage = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(errMessage) => {
        return <div style={{ color: "red" }}>{errMessage}</div>;
      }}
    </ErrorMessage>
  );
};

export default RegisterFormikErrorMessage;