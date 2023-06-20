import React, { useEffect, useState } from 'react'
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
    const [repeatValue, setRepeatValue] = useState<null>(null)
    const [dueDateValue, setDueDateValue] = useState<null>(null)
    function handleInput(event : Event){
        setInputValue(event.target.value)
    }
    function resetValues(){
        setInputValue("")
        setRepeatValue(null)
        setDueDateValue(null)
    }
    function handleCreateTask(){
        const id = uniqid()
        dispatch(addTask(
            {
                text: inputValue,
                completed: false,
                important: false,
                dueDate: dueDateValue,
                repeat: repeatValue,
                createdAt: new Date(),
                ownerId: dispatch(getCurrentUserId()).payload ,
                tagId: tag.id,
                id
            }
        ))
        resetValues()
    }
  return (
    <div className='w-full  shadow rounded-sm'>
        <div className='flex w-full bg-white items-center justify-start  py-3 px-3 space-x-3 rounded-sm'>
            <div className='rounded-full border border-[#225FFC] w-6 h-6 cursor-pointer'>

            </div>
            <div className='w-full'>
                <input value={inputValue} onChange={(e : Event) => handleInput(e)} type="text" placeholder='Add task...' className='w-full focus:outline-none placeholder:text-[#225FFC] placeholder:text-sm placeholder:focus:text-black focus:text-black transition'/>
            </div>
        </div>
        <div className='  flex pt-2 w-full shadow px-3 border-t justify-between'>
            <div className='flex space-x-3'>
                <Tooltip title="Add expire date">
                    <div>
                        <PopoverButton 
                        color="#225FFC"
                        size={25}
                        text="Add expire date" 
                        elements={
                            [
                                {
                                    svgElement:todaySVG,
                                    text:"Today",
                                },
                                {
                                    svgElement:tomorrowSVG,
                                    text:"Tomorrow",
                                },
                                {
                                    svgElement:afterTomorrowSVG,
                                    text:"After tomorrow",
                                },
                                {
                                    svgElement:personalizedSVG,
                                    text:"Select date",
                                },
                            ]
                        } 
                        icon="mdi:calendar"
                        />
                    </div>
                </Tooltip>
                <Tooltip title="Repeat task">
                    <div>
                        <PopoverButton 
                          color="#225FFC"
                          size={25}
                        text="Repeat task" 
                        elements={
                            [
                                {
                                    text:"Daily",
                                    svgElement:dailySVG
                                },
                                {
                                    text:"Work days",
                                    svgElement: workdaysSVG,
                                },
                                {
                                    text:"Weekly",
                                    svgElement: weeklySVG
                                },
                                {
                                    text:"Monthly",
                                    svgElement: monthlySVG
                                },
                                {
                                    text:"Anually",
                                    svgElement: anuallySVG
                                },
                                {
                                    text:"Personalized",
                                    svgElement: personalizedSVG
                                }
                            ]
                        } 
                        icon="material-symbols:repeat"
                        />
                    </div>
                </Tooltip>
              
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
