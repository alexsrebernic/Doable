import React from 'react'
import Task from '../../../../types/Task'
export const TodayTaskItem = ({task} : {task:Task}) => {
  return (
    <div className='bg-white p-3 text-sm rounded-sm shadow-md hover:shadow-xl transition'>
        <ul>
            <li>
                owner: {task.owner}
            </li>
            <li>
                text: {task.text}
            </li>
            <li>
                createdAt: {task.createdAt.toString()}
            </li>
        </ul>
    </div>
  )
}
