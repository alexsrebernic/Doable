import React, { Component, useEffect, useRef, useState } from 'react'
import PopoverButton from '../../PopoverButton/PopoverButton'
import afterTomorrowSVG from '../../../../assets/aftertomorrow.svg'
import personalizedSVG from '../../../../assets/selectdate.svg'
import todaySVG from '../../../../assets/today.svg'
import tomorrowSVG from '../../../../assets/tomorrow.svg'
import anuallySVG from '../../../../assets/anually.svg'
import dailySVG from '../../../../assets/daily.svg'
import monthlySVG from '../../../../assets/monthly.svg'
import weeklySVG from '../../../../assets/weekly.svg'
import workdaysSVG from '../../../../assets/workday.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Tag } from '../../../../types/Tag/Tag'
import uniqid from 'uniqid'
import { addTask } from '../../../../store/slices/tasksSlice'
import {returnDueDateValue} from '../../../../helper/returnDueDateValue'
import { CustomInputDueDate } from './CustomInputDueDate'
import { useContext } from 'react'
import { AppContext } from '../../../../App'
import { useLocation } from 'react-router-dom'
import { isToday } from 'date-fns/esm'
interface Props {
    route : string 
    tag: Tag,
}
export const CreateTaskContainer = ({route,tag} : Props) => {
    const location = useLocation()
    const {user} = useContext(AppContext)
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    useEffect(() => {
        if(location.state) inputRef.current.focus()
        return(() => {
            resetValues()
        })
    },[route])
    const [inputValue,setInputValue] = useState<string>("")
    const [repeatValue, setRepeatValue] = useState<string | null>(null)
    const [dueDateValue, setDueDateValue] = useState<number | null>(null)
    const [repeatValueString, setRepeatValueString] = useState<string | null>(null)
    const [dueDateValueString, setDueDateValueString] = useState<string | null>(null)

    function handleInput(event : Event){
        setInputValue(event.target.value)
    }
    function resetValues(){
        setInputValue("")
        setTaskRepeat(null)
        setTaskDueDate(null)
    }
    const setTaskRepeat = (selectedRepeat) => {
        console.log(selectedRepeat)
        setRepeatValueString(selectedRepeat)
        if(!dueDateValue) setTaskDueDate("Today")
        setRepeatValue(selectedRepeat)
    };
    const setTaskDueDate = (selectedDate) => {
        console.log(selectedDate)
        setDueDateValueString(selectedDate)
        const value = returnDueDateValue(selectedDate) 
        setDueDateValue(value)
    }
    function handleCreateTask(){
        console.log(typeof dueDateValue)
        dispatch(addTask(
            {
                text: inputValue,
                completed: false,
                important: tag.id === 'important'? true : false,
                dueDate: tag.id === 'myday' && !dueDateValue? Date.now() : dueDateValue,
                repeat: repeatValue,
                createdAt: Date.now(),
                ownerId: user.id ,
                myDay: isToday(dueDateValue) || tag.id == 'myday'? true : false,
                myDayDate: isToday(dueDateValue) || tag.id == 'myday'? Date.now() : null,
                tagId: tag.id === 'important' || tag.id ===  'all' || tag.id === 'myday' ? 'mytasks' : tag.id,
                id: uniqid(),
                completedAt: null,
            }
        ))
        resetValues()
    }
    
  return (
    <div className='w-full  shadow rounded-sm'>
        <div className='flex w-full bg-white items-center justify-start  py-3 px-3 space-x-3 rounded-sm'>
            <div>
                <div  style={
                    {
                        border: `1px solid ${tag.theme}`
                    }
                } className={`rounded-full border  w-6 h-6 cursor-pointer`}>
                </div>
            </div>
           
            <div className='w-full'>
                <input ref={inputRef} onKeyDown={(event) => (event.key === 'Enter' && inputValue.length > 0) && handleCreateTask()} value={inputValue} onChange={(e : Event) => handleInput(e)} type="text" placeholder='Add task...' className={`w-full focus:outline-none placeholder:text-[${tag.theme}] placeholder:text-sm placeholder:focus:text-black focus:text-black transition`}/>
            </div>
        </div>
        <div className='  flex py-1 w-full shadow px-3 border-t justify-between'>
            <div className='flex space-x-3'>
                    <div>
                        <PopoverButton 
                        color={tag.theme}
                        size={20}
                        text="Add expire date" 
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
                        icon="mdi:calendar"
                        />
                    </div>
                    <div>
                        <PopoverButton 
                          color={tag.theme}
                          size={20}
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
                        icon="material-symbols:repeat"
                        />
                    </div>
            </div>
            <div>
                <button 
                onClick={handleCreateTask}
                disabled={inputValue? inputValue.length > 0? false : true : true} 
                style={
                    {border : `1px solid ${inputValue.length > 0? tag.theme : 'rgb(156 163 175)'}`,
                    color: inputValue.length > 0? tag.theme : 'gray'
                }
                }
                className={
                    ` px-2 p-0.5 text-sm rounded-sm transition font-medium`}>
                        Add
                </button>
            </div>
        </div>
    </div>
  )
}
