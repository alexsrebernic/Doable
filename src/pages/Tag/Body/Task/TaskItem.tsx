import React, { useContext, useEffect, useState } from 'react'
import Task from '../../../../types/Task/Task'
import { Icon } from '@iconify/react'
import { updateTaskThunk } from '../../../../store/slices/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Tag } from '../../../../types/Tag/Tag'
import { selectTagById } from '../../../../store/slices/tagsSlice'
import getDateStatus from '../../../../helper/getDateStatus'
import { isToday } from 'date-fns'
import { AppContext } from '../../../../App'
import isDateExpired from '../../../../helper/isDateExpired'
interface Props {
  task : Task,
  isDragged : boolean,
  isDragOver: boolean,
  tag: Tag,
}
export const TaskItem = ({task,isDragged,isDragOver,tag} : Props) => {
  const dispatch = useDispatch()
  const {helpSidebar : { taskId, setTaskId, func,state }} = useContext(AppContext)
  const tagName = useSelector(selectTagById(task.tagId))?.name
  const handleToggleCompleted = (e) => {
    dispatch(updateTaskThunk('toggleCompleted',{taskId:task.id}))
    e.stopPropagation()
  }
  const handleToggleImportant = (e) => { 
    dispatch(updateTaskThunk('toggleImportant',{taskId:task.id}))
    e.stopPropagation()
  }
  function handleClick(){
    setTaskId(task.id)
    if(!state) func()
  }
  function checkIfItsExpired(dueDate){
    const isExpired = isDateExpired(dueDate)
    return isExpired
  }
  function checkIfItsMyDayDateExpired(myDayDate){
    const isExpired = isDateExpired(myDayDate)
    if(isExpired) dispatch(updateTaskThunk('toggleMyDay',{taskId:task.id}))
    return isExpired
  }
  return (
    <>
     {
      task && 
      <div onClick={handleClick} style={{
        borderBottom:(isDragOver && !isDragged) ? `2px solid ${tag.theme}` : 'none'
      }}  className={`${isDragged && 'opacity-50'}  cursor-pointer bg-white ${taskId == task.id ? 'bg-slate-200' : 'hover:bg-gray-100'}
       active:cursor-pointer  transition flex  items-center px-3 py-3 space-x-3 shadow  overflow-hidden`}>
        <div>
        <div 
        style={
          {
            backgroundColor: task.completed? tag.theme : 'transparent',
            border: !task.completed? `1px solid ${tag.theme}` : 'none'
          }
        }
        onClick={(e) => handleToggleCompleted(e)} className={` rounded-full border  w-6 h-6 cursor-pointer`}>
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
                <NavLink className={`text-xs  ${(task.dueDate || task.repeat || task.myDay) && 'after:content-["•"] after:px-1'}  truncate max-w-[10ch] md:max-w-full text-gray-500 font-medium hover:underline inline-block w-fit`} to={`/tasks/${task.tagId}`}>
                    {tagName}
                </NavLink>
              </>
            }
            {
              task.myDay &&
              <div className={`text-gray-500 ${(task.dueDate || task.repeat) && 'after:content-["•"] after:px-1'}  max-w-[10ch] text-xs items-center justify-center space-x-1 px-1  flex font-medium   w-fit`}>
                <Icon icon='ph:sun'  />
                <span className='h-fit break-words	'>
                  My day
                </span>
              </div>
            }
         
                <div 
                style={
                  {
                    color: !task.completed? !checkIfItsExpired(task.dueDate)  ? isToday(task.dueDate) ? tag.theme : 'rgb(107 114 128)' : 'red' :  'rgb(107 114 128)'
                  }
                }
                className={`text-[12px] flex items-center space-x-1  flex-wrap`}>

                  {
                    task.dueDate && 
                    <div className='flex items-center space-x-1 flex-wrap break-all '>
                    <Icon icon="bx:calendar" width={16}  />
                      <span className='break-words'>
                        {getDateStatus(task.dueDate)}
                      </span>
                    </div>
                  }
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
          </div>
         
        </div>
        <div onClick={(e) => handleToggleImportant(e)} className=''>
          {
            task!.important?
            <Icon width={25} className=' cursor-pointer' color={tag.theme} icon='ph:star-fill'/>:
            <Icon width={25} className=' cursor-pointer' color={tag.theme} icon='ph:star'/>
          }
        </div>
      </div>
    }
    </>
  ) 
}
