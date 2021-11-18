import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import CategoryIcons from "./CategoryIcons";
import MyTasks from "./MyTasks";
import "./Category.css";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
export default function Category() {
  return (
    <section>
      <div>
        <Link
          className="d-flex align-items-center text-decoration-none text-dark mb-4"
          to="/"
        >
          <img className="pe-2" src={logo} alt="" />
          <h1 className="d-inline-block logo-font">TASKIFY</h1>
        </Link>
        <div className="category text-start py-4 px-4">
          <h6 className="text-white mb-4">Category</h6>
         <CategoryIcons icon={faBriefcase} name="Work" count={0}/>
         <CategoryIcons icon={faUsers} name="Family" count={0}/>
         <CategoryIcons icon={faUser} name="Personal" count={0}/>
         <CategoryIcons icon={faBuilding} name="Business" count={0}/>
         <CategoryIcons icon={faUserFriends} name="Friends" count={0}/>
         <MyTasks/>
        </div>
      </div>
    </section>
  );
}
