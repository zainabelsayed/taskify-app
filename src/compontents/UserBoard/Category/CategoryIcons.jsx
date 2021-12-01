import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CategoryIcons(props) {
  const { icon, name } = props;
  let counter;
  let workCounter = useSelector((state) => state.counterReducer.workCounter);
  let familyCounter = useSelector(
    (state) => state.counterReducer.familyCounter
  );
  let personalCounter = useSelector(
    (state) => state.counterReducer.personalCounter
  );
  let businessCounter = useSelector(
    (state) => state.counterReducer.businessCounter
  );
  let friendsCounter = useSelector(
    (state) => state.counterReducer.friendsCounter
  );

  if (name === "Work") counter = workCounter;
  else if (name === "Family") counter = familyCounter;
  else if (name === "Personal") counter = personalCounter;
  else if (name === "Business") counter = businessCounter;
  else counter = friendsCounter;

  return (
    <Link to={`/user-board/${name}`}>
      <div className="d-flex align-items-baseline text-white justify-content-between icon mb-3">
        <span className="bg-icon me-2">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="me-5"> {name}</span>
        <span className="bg-icon px-2">{counter}</span>
      </div>
    </Link>
  );
}
