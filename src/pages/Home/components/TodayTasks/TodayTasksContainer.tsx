import React from 'react'
import Task from '../../../../types/Task'
import { TodayTaskItem } from './TodayTaskItem'
import { Button } from '../../../../common/Button/Button'
export const TodayTasksContainer = ({tasks} : {tasks: Task[]}) => {
  return (
    <div>
      <div className='pb-3'>
        <h1 className='text-center lg:text-left font-semibold text-2xl '>
          Today tasks
        </h1>
      </div>
        <div>
          <ul>
              {tasks.length == 0?
              tasks.map((o,i) => {
                return (
                  <li>
                    <TodayTaskItem task={o} key={i}/>
                  </li>
                  )
              })
              : 
              <div className='flex items-center flex-col justify-center space-y-2 py-5'>
                <h1>There are no tasks for today!</h1>
                <Button text='Create a task' border={false} shadow={true} hover='hover:shadow-xl'/>
              </div>
              }
          </ul>
      
        </div>
    </div>
  )
}
