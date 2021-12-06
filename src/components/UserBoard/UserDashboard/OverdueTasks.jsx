import React from 'react'
import OverdueItem from "./OverdueItem"
export default function OverdueTasks() {
    return (
        <div className="text-start text-white userDashboard mt-2 p-3">
        <h6 className="pb-2">Overdue Tasks</h6>
        <OverdueItem task="Web Development" color="#00eeff" days={1}/>
        <OverdueItem task="Project Discussion" color="#fcd129" days={3}/>
        <OverdueItem task="Strategy Discussion" color="#f476a3" days={5}/>
      </div>
    )
}
