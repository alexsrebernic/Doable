import React, {useEffect, useState} from 'react'
import Task from '../../../types/Task/Task'
import { Tag } from '../../../types/Tag/Tag'
import { Icon } from '@iconify/react'
import { useDispatch } from 'react-redux'
import {formatDate} from '../../../helper/formatCreatedAtDate'
import { toggleImportant, toggleCompleted, updateTask,toggleMyDay, updateTaskProp } from '../../../store/slices/tasksSlice'
import getDateStatus from '../../../helper/getDateStatus'
import PopoverButton from '../../../pages/Tag/PopoverButton/PopoverButton'
import { CustomInputDueDate } from '../../../pages/Tag/Body/CreateTask/CustomInputDueDate'
import personalizedSVG from '../../../../assets/selectdate.svg'
import afterTomorrowSVG from '../../../assets/aftertomorrow.svg'
import todaySVG from '../../../assets/today.svg'
import tomorrowSVG from '../../../assets/tomorrow.svg'
import anuallySVG from '../../../assets/anually.svg'
import dailySVG from '../../../assets/daily.svg'
import monthlySVG from '../../../assets/monthly.svg'
import weeklySVG from '../../../assets/weekly.svg'
import workdaysSVG from '../../../assets/workday.svg'
import {returnDueDateValue} from '../../../helper/returnDueDateValue'
interface Props {
  task : Task,
  tag: Tag,
  func: Function,
  setTaskId: Function
}
export const TaskData = ({task, tag,func, setTaskId} : Props) => {
  const dispatch = useDispatch()
  const [repeatValue, setRepeatValue] = useState<string | null>(null)
  const [dueDateValue, setDueDateValue] = useState<number | null>(null)
  const [textTaskValue,setTextTaskValue] = useState<string | undefined>(task?.text || '')
  const [repeatValueString, setRepeatValueString] = useState<string | null>(null)
  const [dueDateValueString, setDueDateValueString] = useState<string | null>(null)
  useEffect(() => {
    setTextTaskValue(task.text)
    console.log(task.dueDate)
    if(task.dueDate) {
      setDueDateValueString(getDateStatus(task.dueDate))
      setDueDateValue(task.dueDate)
    }
    if(task.repeat) {
      setRepeatValueString(task.repeat)
      setRepeatValue(task.repeat)
    }
  },[task])

  const handleToggleImportant = () => dispatch(toggleImportant(task.id))
  const handleToggleCompleted = () => dispatch(toggleCompleted(task.id))
  const handleToggleMyDay = () => dispatch(toggleMyDay(task.id))
  function handleCloseTaskSidebar(){
    func()
    setTaskId('')
  }
  function handleChangeInput(e){
    setTextTaskValue(e.target.value)
  }
  const setTaskRepeat = (selectedRepeat) => {
    setRepeatValueString(selectedRepeat)
    if(!dueDateValue) setTaskDueDate("Today")
    setRepeatValue(selectedRepeat)
    dispatch(updateTaskProp({taskId: task.id,prop : 'repeat',value : selectedRepeat}))

};
const setTaskDueDate = (selectedDate) => {
    setDueDateValueString(selectedDate)
    const value = returnDueDateValue(selectedDate) 
    setDueDateValue(value)
    dispatch(updateTaskProp({taskId: task.id,prop : 'dueDate',value : value}))
}
  function onBlur(){
    const newTask = window.structuredClone(task)
    newTask.text = textTaskValue
    dispatch(updateTask(newTask))
  }
  function resetValues(){
    setTaskRepeat(null)
    setTaskDueDate(null)
}
  return (
  <div className='flex flex-col justify-between h-full w-full xl:pb-5'>
    <div className='h-full sm:px-7 px-5 xl:px-10 pt-6 '>
      <div className='flex mb-8'>
        <div  className='' >
            <div
            onClick={handleToggleCompleted}
             style={
              {
              border: `1px solid ${tag?.theme}`,
              backgroundColor: task?.completed? tag?.theme : 'transparent'  
              }
              }
            className='w-6 h-6 rounded-full transition cursor-pointer'
            >

            </div>
        </div>
        <div className='w-full px-3'>
          <input className='font-medium focus:outline-none w-full' onBlur={onBlur} type="text" value={textTaskValue} onChange={(e) => handleChangeInput(e)}/>
        </div>
        <div>
          <div onClick={handleToggleImportant} className=''>
            {
              task!.important?
              <Icon width={25} className=' cursor-pointer' color={tag.theme} icon='ph:star-fill'/>:
              <Icon width={25} className=' cursor-pointer' color={tag.theme} icon='ph:star'/>
            }
          </div>
        </div>
      </div>
      <div className='space-y-7'
      >
        <div className='flex space-x-2 cursor-pointer'
        onClick={handleToggleMyDay}
         style={{
          color: task.myDay ? tag.theme :'black'
        }}
        >
          <Icon 
          width={26}
          icon='ph:sun' 
          />
          <div>
            <span className='font-medium'>{task.myDay? 'Added to My day' : 'Add to My day'}</span>
          </div>
        </div>
        <PopoverButton 
        color={tag.theme}
        size={26}
        text="Repeat task" 
        removeText="Remove repeat"
        removeValueFunc={() => setTaskRepeat(null)}
        value={repeatValueString}
        elements={
            [
                {
                    text:"Daily",
                    svgElement:dailySVG,
                    func: setTaskRepeat,
                    arg: "Daily"
                },
                {
                    text:"Work days",
                    svgElement: workdaysSVG,
                    func: setTaskRepeat,
                    arg: "Work days"

                },
                {
                    text:"Weekly",
                    func: setTaskRepeat,
                    svgElement: weeklySVG,
                    arg: "Weekly"
                },
                {
                    text:"Monthly",
                    func: setTaskRepeat,
                    svgElement: monthlySVG,
                    arg: "Monthly"
                },
                {
                    text:"Anually",
                    func: setTaskRepeat,
                    svgElement: anuallySVG,
                    arg: "Anually"
                },
            ]
        } 
        contentButton={
            <div  className={`${typeof repeatValueString == 'string' && `space-x-2 flex items-center rounded   `} transition flex space-x-2 items-center font-medium` }  >
                <Icon icon='material-symbols:repeat' width={26}  color={task.repeat? tag.theme : 'black'}/>
                {
                  <span style={{color:task.repeat? tag.theme : 'black'}} className={` text-md font-medium`}>{repeatValueString? repeatValueString : 'Repeat'}</span>
                }
            </div>
        }
        />
            <PopoverButton 
              color={task.dueDate ? tag.theme :'black'}
              size={26}
              border={false}
              text="Add due date" 
              value={dueDateValueString}
              removeText="Remove due date"
              removeValueFunc={() => {
                  setTaskDueDate(null)
                  if(repeatValue) resetValues()
              }}
              elements={
                  [
                      {
                          svgElement:todaySVG,
                          text:"Today",
                          func: setTaskDueDate,
                          arg:"Today"
                      },
                      {
                          svgElement:tomorrowSVG,
                          text:"Tomorrow",
                          func: setTaskDueDate,
                          arg: "Tomorrow"
                      },
                      {
                          svgElement:afterTomorrowSVG,
                          text:"After tomorrow",
                          func: setTaskDueDate,
                          arg: "After tomorrow"

                      },
                      {
                        
                          component: <CustomInputDueDate tagColor={tag.theme} setValue={setTaskDueDate}/>
                      },
                  ]
              } 
              contentButton={
                <div  className={`${typeof dueDateValueString == 'string' && `space-x-2 flex items-center rounded   `} transition flex space-x-2 items-center font-medium` }  >
                  <Icon icon='mdi:calendar' width={26}  color={task.dueDate ? tag.theme :'black'}/>
                  {
                    <span style={{color:task.dueDate ? tag.theme :'black'}} className={` text-md line-break text-left`}>{dueDateValueString ? dueDateValueString : 'Add due date'}</span>
                  }
                </div>
              }
              />
      </div>
    </div>
    <div className='xl:px-10 px-5 sm:px-7 py-4 border-t-[1px] border-solid border-t-gray-200'>

      <div className='flex items-center justify-between '>
        <div className='cursor-pointer ' onClick={handleCloseTaskSidebar}>
            <Icon color={tag?.theme} icon="mdi:menu-close" width={30}/>
        </div> 
        <div >
          <span className='text-sm font-medium text-gray-500'>
            Created {formatDate(task?.createdAt)}
          </span>
        </div>
        <div className='cursor-pointer'>
          <Icon icon="ph:trash" color={tag?.theme} width={25}/>
        </div>  
      </div>
    
    </div>
  </div>
  )
}
