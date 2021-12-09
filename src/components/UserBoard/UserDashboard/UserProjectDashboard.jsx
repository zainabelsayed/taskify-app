import React from "react";
import "react-circular-progressbar/dist/styles.css";
import "./UserDashboard.css";
import userImg from "../../../assets/images/user-img.jpg";
import { Link } from "react-router-dom";
export default function UserProjectDashboard() {
  const logout = () => {
    sessionStorage.removeItem("user");
  };
  return (
    <section>
      <div className="userProfile mb-2">
        <div className="d-flex align-items-center justify-content-between">
          <figure className="w-25 mb-0">
            <img className="rounded-circle w-100" src={userImg} alt="" />
          </figure>
          <div className="text-start w-50 ms-3">
            <h6 className="mb-0 fw-bold fs-6 w-100">
              {sessionStorage.getItem("user")}
            </h6>
            {/* <p className="text-secondary fs-min">UI/UX Designer</p> */}
          </div>
          <div className="dropdown w-25">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link to="/login" className="dropdown-item" onClick={logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
