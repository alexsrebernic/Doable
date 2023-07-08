import React, { useEffect, useState } from 'react'
import Task from '../../../../types/Task/Task'
import { Icon } from '@iconify/react'
import { toggleImportant,toggleCompleted, updateTask } from '../../../../store/slices/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Tag } from '../../../../types/Tag/Tag'
import { selectTagById } from '../../../../store/slices/tagsSlice'
import getDateStatus from '../../../../helper/getDateStatus'
import { isToday } from 'date-fns'

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
    return useSelector(selectTagById(task.tagId))?.name
  }
  function getTaskDueDate(){

  }
  return (
    <>
     {
      task && 
      <div   className={`${isDragged && 'opacity-50'} ${(isDragOver && !isDragged) && 'border-b-[#225FFC] border-b-2 border-solid'} cursor-grab bg-white 
      hover:bg-gray-50  transition flex  items-center px-3 py-3 space-x-3 shadow  overflow-hidden`}>
        <div>
        <div onClick={handleToggleCompleted} className={`${
          task.completed? 
          'bg-[#225FFC]' : 
          'border-[#225FFC]'
        } rounded-full border  w-6 h-6 cursor-pointer`}>
        </div>
        </div>
       
        <div className='w-full   flex flex-col '>
          <div className={`font-medium max-w-full break-all flex-wrap  ${task.completed && 'line-through'}`}>
            <span>
              {task.text}
            </span>
          </div>
          <div className='leading-[0px] flex-wrap  flex'>
          {
              tag.id !== task.tagId &&
              <>
                <NavLink className={`text-xs after:px-1 ${(task.dueDate || task.repeat) && 'after:content-["•"]'}  truncate max-w-[10ch] md:max-w-full text-gray-500 font-medium hover:underline inline-block w-fit`} to={`/tasks/${task.tagId}`}>
                    {getTagName()}
                </NavLink>
               
              </>
            }
            {
              (task.dueDate || task.repeat) &&
                <div className={`text-[12px] flex items-center space-x-1  ${isToday(task.dueDate) ? 'text-[#225FFC]':'text-gray-500'}`}>
                  <div className='flex items-center space-x-1'>
                  <Icon icon="bx:calendar" width={16} />
                    <span>
                      {getDateStatus(task.dueDate)}
                    </span>
                  </div>
                  {
                    task.repeat && 
                    <div>
                      <Icon 
                        icon="material-symbols:repeat"
                        width={16}
                      />
                    </div>
                  }
              </div>
            }
          </div>
         
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
