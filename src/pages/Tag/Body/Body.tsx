import React from 'react'
import { TaskContainer } from './Task/TaskContainer'
import { CreateTaskContainer } from './CreateTask/CreateTaskContainer'
export const Body = () => {
  return (
    <div className='my-5'>
        <CreateTaskContainer/>
        <TaskContainer/>
    </div>
  )
}
