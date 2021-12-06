import React from 'react'
import UpcomingDeadLinesItem from "./UpcomingDeadLinesItem"
export default function UpcomingDeadLines() {
    return (
        <div className="text-start text-white userDashboard mt-2 p-3">
        <h6 className="pb-2">Upcoming Deadline</h6>
        <UpcomingDeadLinesItem task="Flowchart" progress={50} color="#00eeff" />
        <UpcomingDeadLinesItem task="UX Design" progress={30} color="#fcd129" />
        <UpcomingDeadLinesItem
          task="UI Development"
          progress={20}
          color="#f476a3"
        />
      </div>
    )
}
