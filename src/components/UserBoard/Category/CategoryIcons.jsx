import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function CategoryIcons(props) {
    const {icon, name, count} = props
  return (
    <div className="d-flex align-items-baseline text-white justify-content-between icon mb-3">
      <span className="bg-icon me-2">
        <FontAwesomeIcon icon={icon} />
      </span>
      <span className="me-5"> {name}</span>
      <span className="bg-icon px-2">{count}</span>
    </div>
  );
}
