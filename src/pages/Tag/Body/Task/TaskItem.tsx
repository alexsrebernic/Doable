import React, { useEffect, useState } from 'react'
import Task from '../../../../types/Task/Task'
import { Icon } from '@iconify/react'
import { toggleImportant,toggleCompleted, updateTask } from '../../../../store/slices/tasksSlice'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Tag } from '../../../../types/Tag/Tag'
interface Props {
  task : Task,
  isDragged : boolean,
  isDragOver: boolean,
  tag: Tag,
}
export const TaskItem = ({task,isDragged,isDragOver,tag} : Props) => {
  const dispatch = useDispatch()
  const handleToggleCompleted = () => dispatch(toggleCompleted(task.id))
  const handleToggleImportant = () => dispatch(toggleImportant(task.id))
  function getTagName(){
    if(tag.id === task.tagId) return ''
    return 
  }
  return (
    <>
     {
      task && 
      <div   className={`${isDragged && 'opacity-50'} ${(isDragOver && !isDragged) && 'border-b-[#225FFC] border-b-2 border-solid'} bg-white hover:bg-gray-50  transition flex  items-center px-3 py-3 space-x-3 shadow cursor-pointer`}>
        <div>
        <div onClick={handleToggleCompleted} className={`${
          task.completed? 
          'bg-[#225FFC]' : 
          'border-[#225FFC]'
        } rounded-full border  w-6 h-6 cursor-pointer`}>
        </div>
        </div>
       
        <div className='w-full  flex flex-col overflow-auto '>
          <span className={`font-medium  whitespace-nowrap ${task.completed && 'line-through'}`}>
          {task.text}
          </span>
            {
              tag.id !== task.tagId &&
              <>
                <NavLink className='text-xs text-gray-500 font-medium hover:underline inline-block w-fit' to={`/tasks/${task.tagId}`}>
                    {task.tagName}
                </NavLink>
              </>
            }
        </div>
        <div onClick={handleToggleImportant} className=''>
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
