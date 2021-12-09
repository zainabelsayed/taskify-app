import React from "react";
import Board from "../Board/Board";
import BoardHeader from "../boardHeader/BoardHeader";
import "./UserBoard.css";

export default function UserBoard() {
  return (
    <>
      <div className="px-xl-5 px-3">
        <BoardHeader />
        <div>
          <Board />
        </div>
      </div>
    </>
  );
}
