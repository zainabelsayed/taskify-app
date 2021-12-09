import React from "react";
import Board from "../Board/Board";
import BoardHeader from "../boardHeader/BoardHeader";
import "./UserBoard.css";

export default function UserBoard() {
  return (
    <>
      <div className="px-lg-4">
        <BoardHeader />
        <div>
          <Board />
        </div>
      </div>
    </>
  );
}
