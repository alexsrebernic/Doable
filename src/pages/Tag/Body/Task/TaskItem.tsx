import React, { useEffect, useState } from 'react'
import Task from '../../../../types/Task/Task'
import { Icon } from '@iconify/react'
import { toggleImportant,toggleCompleted, updateTask } from '../../../../store/slices/tasksSlice'
import { useDispatch } from 'react-redux'
export const TaskItem = ({task} : {task:Task}) => {
  const dispatch = useDispatch()
  const handleToggleCompleted = () => dispatch(toggleCompleted(task.id))
  const handleToggleImportant = () => dispatch(toggleImportant(task.id))
  return (
    <>
     {
      task && 
      <div  className='bg-white hover:bg-gray-50 transition flex items-center px-3 py-3 space-x-3 shadow cursor-pointer'>
        <div onClick={handleToggleCompleted} className={`${task.completed? 'bg-[#225FFC]' : 'border-[#225FFC]'} rounded-full border  w-6 h-6 cursor-pointer`}>
      </div>
        <div className='flex-grow'>
          <span className='font-medium'>
          {task.text}
          </span>
        </div>
        <div onClick={handleToggleImportant} className='px-3'>
          {
            task!.important?
            <Icon width={25} className=' cursor-pointer' color='#225FFC' icon='ph:star-fill'/>:
            <Icon width={25} className=' cursor-pointer' color='#225FFC' icon='ph:star'/>

          }
        </div>
      </div>
    }
    </>
  ) 
}
