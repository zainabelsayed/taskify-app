import React from "react";
import Board from "../Board/Board";
import BoardHeader from "../boardHeader/BoardHeader";
import "./UserBoard.css";

export default function UserBoard({match}) {
  const id = match.params.projectID;
  return (
    <>
      <div className="px-lg-4">
        <BoardHeader 
        projectID = {id}
        />
        <div>
          <Board />
        </div>
      </div>
    </>
  );
}
