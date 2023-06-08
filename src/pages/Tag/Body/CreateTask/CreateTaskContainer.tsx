import React, { useState } from 'react'
import PopoverButton from '../../PopoverButton/PopoverButton'
import { Icon } from '@iconify/react'
import { Tooltip } from '@mui/material'
import afterTomorrowSVG from '../../../../assets/aftertomorrow.svg'
import selectDateSVG from '../../../../assets/selectdate.svg'
import todaySVG from '../../../../assets/today.svg'
import tomorrowSVG from '../../../../assets/tomorrow.svg'

export const CreateTaskContainer = () => {
    const [inputValue,setInputValue] = useState<String | null>(null)
    function handleInput(event : Event){
        setInputValue(event.target.value)
    }
  return (
    <div className='w-full  space-y-2'>
        <div className='flex w-full bg-white items-center justify-start shadow py-3 px-3 space-x-3'>
            <div className='rounded-full border border-[#225FFC] w-6 h-6 cursor-pointer'>

            </div>
            <div className='w-full'>
                <input onChange={(e : Event) => handleInput(e)} type="text" placeholder='Add task...' className='w-full focus:outline-none placeholder:text-[#225FFC] placeholder:text-sm placeholder:focus:text-black focus:text-black transition'/>
            </div>
        </div>
        <div className=' bg-white flex pt-2 w-full shadow px-3 justify-between'>
            <div className='flex space-x-3'>
                <Tooltip title="Add expire date">
                    <div>
                        <PopoverButton 
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
                                    svgElement:selectDateSVG,
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
                        text="Repeat task" 
                        elements={
                            [
                                {

                                },

                            ]
                        } 
                        icon="material-symbols:repeat"
                        />
                    </div>
                </Tooltip>
              
            </div>
            <div>
                <button 
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
