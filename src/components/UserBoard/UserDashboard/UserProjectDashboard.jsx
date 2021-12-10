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
          <div className="icon px-1 fw-bold shadow-sm border-0">
          {sessionStorage.getItem("user").charAt(0).toUpperCase()}
          </div>
          <div className="text-center w-75">
            <h6 className="mb-0 fw-bold w-100 p-0">
              {sessionStorage.getItem("user")}
            </h6>
            {/* <p className="text-secondary fs-min">UI/UX Designer</p> */}
          </div>
          <div className="dropdown">
            <button
              className="btn btn-secondary px-1 py-0 dropdown-toggle"
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
