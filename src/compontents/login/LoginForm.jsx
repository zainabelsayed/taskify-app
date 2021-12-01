import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import LoginFormikField from "./LoginFormikField";
import LoginFormikErrorMessage from "./LoginFormikErrorMessage";
import { Link, useHistory } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { app } from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

import "../../css/main.css";
import "../../css/util.css";
import "../../vendor/animate/animate.css";
import "../../fonts/iconic/css/material-design-iconic-font.min.css";
import "../../vendor/animsition/css/animsition.min.css";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const history = useHistory();

  const onSubmit = (values) => {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, values.email, values.password)
      .catch(function (error) {
        var errorCode = error.code;
        if (errorCode === "email-already-in-use") {
          alert("You already have an account with that email.");
        } else if (errorCode === "auth/invalid-email") {
          alert("Please provide a valid email");
        } else if (errorCode === "auth/wrong-password") {
          alert("Wrong password. Please try again");
        } else alert(error.message);
      })
      .then((response) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/`))
          .then((snapshot) => {
            const arr = [];
            Object.keys(snapshot.val()).forEach((key) =>
              arr.push({
                name: key,
                data: snapshot.val()[key],
              })
            );
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].data.email === values.email)
                sessionStorage.setItem("user", arr[i].name);
            }
            if (response !== undefined) history.push("/user-board");
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email field is required"),
    password: yup.string().required("Password field is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <div className="limiter">
            <div className="container-login100 back-ground-img">
              <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <Form className="login100-form validate-form">
                  <span className="login100-form-title p-b-49">Login</span>
                  <div className="wrap-input100 m-b-23">
                    <LoginFormikField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Type your email"
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#x2709;"
                    ></span>
                  </div>
                  <LoginFormikErrorMessage name="email" />
                  <div className="wrap-input100 m-b-23 mt-5">
                    <LoginFormikField
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Type your password"
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#xf190;"
                    ></span>
                  </div>
                  <LoginFormikErrorMessage name="password" />
                  <div className="container-login100-form-btn mt-5">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button type="submit" className="login100-form-btn">
                        Login
                      </button>
                    </div>
                  </div>

                  <div className="flex-col-c p-t-155">
                    <span className="txt1 p-b-17">Or Sign Up Using</span>

                    <Link to="/register" className="txt2">
                      Sign Up
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
