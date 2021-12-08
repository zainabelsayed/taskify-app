import React from "react";
import { ErrorMessage } from "formik";

const LoginFormikErrorMessage = ({ name }) => {
  return (
    <ErrorMessage name={name}>
      {(errMessage) => {
        return (
          <div style={{ color: "#860000" }} className="mb-3">
            {errMessage}
          </div>
        );
      }}
    </ErrorMessage>
  );
};

export default LoginFormikErrorMessage;
