import React from 'react'
import CategoryIcons from './CategoryIcons'
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function MyTasks() {
    return (
        <div className="mt-3">
            <h6 className="text-white mb-4">My Tasks</h6>
            <CategoryIcons icon={faListAlt} name="To Do" count={0}/>
            <CategoryIcons icon={faSpinner} name="Progress" count={0}/>
            <CategoryIcons icon={faCheck} name="Done" count={0}/>
        </div>
    )
}