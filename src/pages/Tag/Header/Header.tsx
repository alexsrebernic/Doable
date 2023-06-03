import React, { useState } from 'react'
import { Tag } from '../../../types/Tag'
import { Icon } from '@iconify/react'
import {getCurrentDate} from '../../../helper/getCurrentDate.js'
import { Popover,Tooltip } from '@mui/material'
import PopoverButton from '../PopoverButton/PopoverButton'
export const Header = ({tag} : {tag:Tag}) => {

    const menuSettingsElement = [
        {
            icon:"material-symbols:print",
            text:"Print this list"
        },
        {
            icon:"mdi:paint-outline",
            text:"Change theme"
        }
    ]
    const menuSortElement = [
        {
            icon:"ic:round-star",
            text:"Importance"
        },
        {
            icon:"mdi:calendar",
            text:"Due date"
        },
        {
            icon:"bx:sort",
            text:"Alphabetically"
        },
        {
            icon:"zondicons:date-add",
            text:"Creation date"
        }
    ]
  return (
    <div>
        <div className='flex items-center space-x-3'>
            <div>
                <h1 className='font-semibold text-xl sm:text-2xl md:text-3xl 2xl:text-3xl truncate'>
                    {tag.name}
                </h1>
                <div>
                    {tag.name == 'My day' && 
                    <span className='text-gray-500 font-medium'>
                        {getCurrentDate("/")}
                    </span>
                    }
                </div>
            </div>
            <div className='flex items-center justify-between w-full'>
                    <Tooltip title="Categorie menu">
                        <div>
                            <PopoverButton icon="ph:dots-three-bold" text="Settings" elements={menuSettingsElement}/>
                        </div>
                    </Tooltip>
        
                <div className='flex space-x-4 font-medium text-[#225FFC]'>
                    <Tooltip title="Sort tasks">
                        <div>
                            <PopoverButton icon="bx:sort" text="Sort" elements={menuSortElement}/>
                        </div>
                    </Tooltip>
                    <Tooltip title="Suggestions to add to your list" className='cursor-pointer'>
                        <Icon icon="carbon:idea" width={30} color='#225FFC'/>
                    </Tooltip>
                </div>
            </div>
        </div>
    </div>
  )
}
