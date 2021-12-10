import React from "react";
import Category from "../Category/Category";
import UserProjectDashboard from "../UserDashboard/UserProjectDashboard";
import ProjectBoard from "../Board/ProjectBoard";
import "./UserBoard.css";
export default function UserBoard() {
  return (
    <div className="px-5 py-2 d-flex justify-content-between align-items-start myBoard">
      <div className="catergory-and-dashboard-width">
        <Category />
      </div>
      <div className="project-board-width mx-3">
        <ProjectBoard />
      </div>
      <div className="catergory-and-dashboard-width">
        <UserProjectDashboard />
      </div>
    </div>
  );
}
