import React from 'react'
import Category from '../Category/Category'
import UserDashboard from '../UserDashboard/UserDashboard'
import Board from "../Board/Board"
import "./UserBoard.css"
export default function UserBoard() {
    return (
        <div className="px-5 py-2 d-flex justify-content-between align-items-start">
            <div className="catergory-and-dashboard-width">
            <Category/>
            </div>
            <div className="board-width mx-3">
            <Board/>
            </div>
            <div className="catergory-and-dashboard-width">
            <UserDashboard/>
            </div>
        </div>
    )
}
