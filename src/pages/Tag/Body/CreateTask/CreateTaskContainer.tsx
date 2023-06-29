import React, { Component, useEffect, useState } from 'react'
import PopoverButton from '../../PopoverButton/PopoverButton'
import { Icon } from '@iconify/react'
import { Tooltip } from '@mui/material'
import afterTomorrowSVG from '../../../../assets/aftertomorrow.svg'
import personalizedSVG from '../../../../assets/selectdate.svg'
import todaySVG from '../../../../assets/today.svg'
import tomorrowSVG from '../../../../assets/tomorrow.svg'
import anuallySVG from '../../../../assets/anually.svg'
import dailySVG from '../../../../assets/daily.svg'
import monthlySVG from '../../../../assets/monthly.svg'
import weeklySVG from '../../../../assets/weekly.svg'
import workdaysSVG from '../../../../assets/workday.svg'
import { useDispatch } from 'react-redux'
import { Tag } from '../../../../types/Tag/Tag'
import uniqid from 'uniqid'
import { addTask } from '../../../../store/slices/tasksSlice'
import { getCurrentUserId } from '../../../../store/slices/userSlice'
import {returnDueDateValue} from '../../../../helper/returnDueDateValue'
interface Props {
    route : string 
    tag: Tag
}
export const CreateTaskContainer = ({route,tag} : Props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        resetValues()
    },[route])
    const [inputValue,setInputValue] = useState<string>("")
    const [repeatValue, setRepeatValue] = useState<string | null>(null)
    const [dueDateValue, setDueDateValue] = useState<Date | null>(null)
    const [repeatValueString, setRepeatValueString] = useState<string | null>(null)
    const [dueDateValueString, setDueDateValueString] = useState<string | null>(null)

    function handleInput(event : Event){
        setInputValue(event.target.value)
    }
    function resetValues(){
        setInputValue("")
        setRepeatValue(null)
        setDueDateValue(null)
    }
    const setTaskRepeat = (selectedRepeat) => {
        setRepeatValueString(selectedRepeat)
        setRepeatValue(selectedRepeat)
    };
    const setTaskDueDate = (selectedDate) => {
        setDueDateValueString(selectedDate)
        const value = returnDueDateValue(selectedDate) 
        setDueDateValue(value)
    }
    function handleCreateTask(){
        dispatch(addTask(
            {
                text: inputValue,
                completed: false,
                important: tag.id === 'important'? true : false,
                dueDate: tag.id === 'myday'? new Date() : dueDateValue,
                repeat: repeatValue,
                createdAt: new Date(),
                ownerId: dispatch(getCurrentUserId()).payload ,
                tagId: tag.id === 'important' || tag.id ===  'all'? 'mytasks' : tag.id,
                tagName: tag.id === 'important' || tag.id === 'all'? 'My tasks' : tag.name,
                id: uniqid()
            }
        ))
        resetValues()
    }
  return (
    <div className='w-full  shadow rounded-sm'>
        <div className='flex w-full bg-white items-center justify-start  py-3 px-3 space-x-3 rounded-sm'>
            <div>
                <div className='rounded-full border border-[#225FFC] w-6 h-6 cursor-pointer'>
                </div>
            </div>
           
            <div className='w-full'>
                <input value={inputValue} onChange={(e : Event) => handleInput(e)} type="text" placeholder='Add task...' className='w-full focus:outline-none placeholder:text-[#225FFC] placeholder:text-sm placeholder:focus:text-black focus:text-black transition'/>
            </div>
        </div>
        <div className='  flex py-1 w-full shadow px-3 border-t justify-between'>
            <div className='flex space-x-3'>
                    <div>
                        <PopoverButton 
                        color="#225FFC"
                        size={20}
                        text="Add expire date" 
                       
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
                                    svgElement:personalizedSVG,
                                    text:"Select date",
                                    component: <Component/>
                                },
                            ]
                        } 
                        icon="mdi:calendar"
                        />
                    </div>
                    <div>
                        <PopoverButton 
                          color="#225FFC"
                          size={20}
                        text="Repeat task" 
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
                                {
                                    text:"Personalized",
                                    svgElement: personalizedSVG,
                                    component: <Component/>
                                }
                            ]
                        } 
                        icon="material-symbols:repeat"
                        />
                    </div>
            </div>
            <div>
                <button 
                onClick={handleCreateTask}
                disabled={inputValue? inputValue.length > 0? false : true : true} 
                className={
                    `${inputValue? 
                        inputValue.length > 0? 
                        'border-[#225FFC] text-[#225FFC] ' 
                        :'border-gray-400 text-gray-500'
                        :'border-gray-400 text-gray-500'} 
                        border px-2 p-0.5 text-sm rounded-sm transition font-medium`}>
                        Add
                </button>
            </div>
        </div>
    </div>
  )
}
