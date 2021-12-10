import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import CategoryIcons from "./CategoryIcons";
import "./Category.css";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { child, get, getDatabase, ref } from "firebase/database";

export default function Category() {
  const [counter, setCounter] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const userName = sessionStorage.getItem("user");
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userName}/projects/`))
      .then((snapshot) => {
        if (snapshot !== undefined) {
          const arr = [];
          if (snapshot.val() !== null) {
            Object.keys(snapshot.val()).forEach((key) =>
              arr.push({
                name: key,
                data: snapshot.val()[key],
              })
            );
          }
          let temp = [0, 0, 0, 0, 0];
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].data.category === "Work") temp[0] += 1;
            else if (arr[i].data.category === "Family") temp[1] += 1;
            else if (arr[i].data.category === "Personal") temp[2] += 1;
            else if (arr[i].data.category === "Business") temp[3] += 1;
            else temp[4] += 1;
          }
          setCounter(temp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          <CategoryIcons icon={faBriefcase} name="Work" count={counter[0]} />
          <CategoryIcons icon={faUsers} name="Family" count={counter[1]} />
          <CategoryIcons icon={faUser} name="Personal" count={counter[2]} />
          <CategoryIcons icon={faBuilding} name="Business" count={counter[3]} />
          <CategoryIcons
            icon={faUserFriends}
            name="Friends"
            count={counter[4]}
          />
        </div>
      </div>
    </section>
  );
}