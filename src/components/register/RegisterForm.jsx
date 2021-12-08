import React from "react";
import "../../css/main.css";
import "../../css/util.css";
import "../../vendor/animate/animate.css";
import "../../vendor/animsition/css/animsition.min.css";
import "../../fonts/iconic/css/material-design-iconic-font.min.css";
import { Formik, Form } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import RegisterFormikField from "../register/RegisterFormikField";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
// import logo from "../../images/logo.png";
// eslint-disable-next-line no-unused-vars
import { app } from "../../firebase-config";
import RegisterFormikErrorMessage from "./RegisterFormikErrorMessage";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  // FacebookAuthProvider,
} from "firebase/auth";
library.add(faFacebookF);
library.add(faGooglePlusG);

const RegisterForm = () => {
  const initialValues = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const history = useHistory();

  const onSubmit = (values) => {
    const dbRef = ref(getDatabase());
    var found = 0;
    get(child(dbRef, `users/`))
      .then((snapshot) => {
        const arr = Object.keys(snapshot.val());
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === values.username) {
            alert("Username is already used!");
            found = 1;
            break;
          }
        }
        if (found === 0) {
          const authentication = getAuth();
          createUserWithEmailAndPassword(
            authentication,
            values.email,
            values.password
          )
            .then((response) => {
              if (response !== undefined) {
                set(ref(getDatabase(), "users/" + values.username), {
                  userID: uuidv4(),
                  fullname: values.fullname,
                  email: values.email,
                  password: values.password,
                  mobile: "",
                });
                sessionStorage.setItem("user", values.username);
                history.push("/user-project-board");
              }
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use")
                alert("Email is already used!");
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onGmail = () => {
    const authentication = getAuth();
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(authentication, googleProvider)
      .then((result) => {
        if (result !== undefined) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // eslint-disable-next-line no-unused-vars
          const token = credential.accessToken;
          // eslint-disable-next-line no-unused-vars
          const user = result.user;
          set(ref(getDatabase(), "users/" + user.displayName), {
            userID: uuidv4(),
            fullname: "",
            email: user.email,
            password: "",
            mobile: "",
            project: "",
          });
          sessionStorage.setItem("user", user.displayName);
          history.push("/user-project-board");
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        // eslint-disable-next-line no-unused-vars
        const errorMessage = error.message;
        // eslint-disable-next-line no-unused-vars
        const email = error.email;
        // eslint-disable-next-line no-unused-vars
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  // const onFacebook = () => {
  //   const authentication = getAuth();
  //   const facebookProvider = new FacebookAuthProvider();
  //   signInWithPopup(authentication, facebookProvider)
  //     .then((result) => {
  //       const credential = FacebookAuthProvider.credentialFromResult(result);
  //       const accessToken = credential.accessToken;
  //       const user = result.user;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       const email = error.email;
  //       const credential = FacebookAuthProvider.credentialFromError(error);
  //     });
  // };

  const validationSchema = yup.object({
    fullname: yup.string().required("Please enter your full name"),
    username: yup.string().required("username field is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email field is required"),
    password: yup
      .string()
      .required("Password field is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    confirmPassword: yup
      .string()
      .required("Password field is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
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
                  <span className="login100-form-title p-b-49">
                    {/* <img src={logo}></img> */}
                    Sign Up
                  </span>
                  <div className="wrap-input100 validate-input m-b-23">
                    <RegisterFormikField
                      label="Full Name"
                      name="fullname"
                      type="text"
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#9787;"
                    ></span>
                  </div>
                  <RegisterFormikErrorMessage name="fullname" />

                  <div className="wrap-input100 validate-input m-b-23">
                    <RegisterFormikField
                      label="Username"
                      name="username"
                      type="text"
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#xf206;"
                    ></span>
                  </div>
                  <RegisterFormikErrorMessage name="username" />

                  <div className="wrap-input100 validate-input m-b-23">
                    <RegisterFormikField
                      label="Email"
                      name="email"
                      type="email"
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#x2709;"
                    ></span>
                  </div>
                  <RegisterFormikErrorMessage name="email" />

                  <div className="wrap-input100 validate-input m-b-23">
                    <RegisterFormikField
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#xf190;"
                    ></span>
                  </div>
                  <RegisterFormikErrorMessage name="password" />

                  <div className="wrap-input100 validate-input m-b-23">
                    <RegisterFormikField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#xf190;"
                    ></span>
                  </div>
                  <RegisterFormikErrorMessage name="confirmPassword" />

                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn" type="submit">
                        Sign Up
                      </button>
                    </div>
                  </div>

                  <div className="txt1 text-center p-t-54 p-b-20">
                    <span>Or Sign Up Using</span>
                  </div>

                  <div className="flex-c-m">
                    {/* <a
                      href="#"
                      className="login100-social-item bg1"
                      onClick={onFacebook}
                    >
                      <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    </a> */}
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="login100-social-item bg3"
                      onClick={onGmail}
                    >
                      <FontAwesomeIcon icon={["fab", "google-plus-g"]} />
                    </a>
                  </div>

                  <div className="flex-col-c p-t-155">
                    <span className="txt1 p-b-17">
                      Already have an account?
                    </span>

                    <Link to="/login" className="txt2">
                      Login
                    </Link>
                  </div>

                  {/* <pre>  {JSON.stringify(formik, null, 4)}</pre>   */}
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};
export default RegisterForm;
