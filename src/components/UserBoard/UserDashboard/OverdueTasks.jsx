import React, { useEffect } from 'react'
import OverdueItem from "./OverdueItem"

export default function OverdueTasks(props) {
  const { tasks, overdue } = props;
useEffect(()=>{
},[overdue])
    return (
        <div className="text-start text-white userDashboard mt-2 p-3 d-none d-lg-block">
        <h6 className="pb-2">Overdue Tasks</h6>
        <div>
        {overdue?.length > 0 ? tasks.map((item, index) => {
          if(item.overdue && item.list !== "Done"){
          return(
          <OverdueItem key={item.id}
            task={item.taskName}
            textColor={`text-${item.list} text-Todo`}
            overdue={item.overdue}
          />)
        }}):(
          <p className="text-Done">You have no overdue tasks!</p>
        )}
        </div>
      </div>
    )
}
