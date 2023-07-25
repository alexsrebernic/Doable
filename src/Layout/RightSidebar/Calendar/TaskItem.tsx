import React, { useContext } from 'react'
import Task from '../../../types/Task/Task'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectTaskById } from '../../../store/slices/tasksSlice'
import { toggleCompleted } from '../../../store/slices/tasksSlice'
import getDateStatus from '../../../helper/getDateStatus'
import { selectTagById } from '../../../store/slices/tagsSlice'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../../App'
import isDateExpired from '../../../helper/isDateExpired'
import isToday from 'date-fns/isToday'
interface Props {
    task: Task
}
export const TaskItem = ({task} : Props) => {
    const dispatch = useDispatch()
    const handleToggleCompleted = () => dispatch(toggleCompleted(task.id))
  
    function getTagName(){
      return useSelector(selectTagById(task.tagId))?.name
    }
    function checkIfItsExpired(dueDate){
        const isExpired = isDateExpired(dueDate)
        console.log(isExpired)
        return isExpired
      }
  return (
    <div className='w-full flex items-center space-x-6'>
        <div>
            <div className={`${task.completed? 'bg-[#225ffc]' : 'bg-[#D9D9D9]'} w-6 h-6 cursor-pointer transition rounded-sm`} onClick={handleToggleCompleted}></div>
        </div>
        <div className='flex-1 flex flex-col items-start truncate'>
            <div className='max-w-[20ch] overflow-x-auto '>
                <span className='text-md '>
                    {task.text}
                </span>
            </div>
            <div className='text-xs space-x-3'>
                <NavLink className={``} to={`/tasks/${task.tagId}`}>
                    {getTagName()}
                </NavLink>
                <span  style={
                    {
                        color: !task.completed? !checkIfItsExpired(task.dueDate)  ? isToday(task.dueDate) ? '#225ffc' : 'rgb(107 114 128)' : 'red' :  'rgb(107 114 128)'
                    }
                }>
                    {getDateStatus(task.dueDate)}
                </span>
            </div>
        </div>
    </div>
  )
}
