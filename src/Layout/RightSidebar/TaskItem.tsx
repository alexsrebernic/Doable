import React from 'react'
import Task from '../../types/Task/Task'
interface Props {
    task: Task
}
export const TaskItem = ({task} : Props) => {
  return (
    <div>
        <div>
            <div>
                
            </div>
        </div>
        <div>
            <div>
                <span>
                    {task.text}
                </span>
            </div>
            <div>
                <span>
                    
                </span>
                <span>

                </span>
            </div>
        </div>
    </div>
  )
}
