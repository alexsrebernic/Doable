import React, { useState } from 'react'
import { Tag } from '../../../types/Tag/Tag'
import { Icon } from '@iconify/react'
import {getCurrentDate} from '../../../helper/getCurrentDate.js'
import { Popover,Tooltip } from '@mui/material'
import PopoverButton from '../PopoverButton/PopoverButton'
import { Emoji } from 'emoji-picker-react'
import { useDispatch } from 'react-redux'
import { updateTagProp } from '../../../store/slices/tagsSlice'
import convertCamelCaseToNormal from '../../../helper/convertCamelCaseToNormal'
export const Header = ({tag} : {tag:Tag}) => {
    const dispatch = useDispatch()
    function printList(){

    }
    function changeTheme(){

    }
    function changeSortOrder(order){
        console.log(order)
        if(order == tag.sortBy) {
           return dispatch(updateTagProp({tagId: tag.id, prop: 'sortBy', value: null}))
        }
        return dispatch(updateTagProp({tagId: tag.id, prop: 'sortBy', value: order}))
    }
    const menuSettingsElement = [
        {
            icon:"material-symbols:print",
            text:"Print this list",
            func: printList,
        },
        {
            icon:"mdi:paint-outline",
            text:"Change theme",
            func: changeTheme
        }
    ]
    const menuSortElement = [
        {
            icon:"ic:round-star",
            text:"Importance",
            func: changeSortOrder,
            arg: 'importance'
        },
        {
            icon:"mdi:calendar",
            text:"Due date",
            func: changeSortOrder,
            arg: 'dueDate'
        },
        {
            icon:"bx:sort",
            text:"Alphabetically",
            func: changeSortOrder,
            arg: 'alphabetically',

            
        },
        {
            icon:"zondicons:date-add",
            text:"Creation date",
            func: changeSortOrder,
            arg: 'createdAt'
        }
    ]
      function toggleSortOrder (){
        dispatch(updateTagProp({tagId: tag.id, prop: 'sortOrder', value: tag.sortOrder === 'asc'? 'desc' : 'asc'}))
      }
      function removeSortBy(){
        dispatch(updateTagProp({tagId: tag.id, prop: 'sortBy', value: null}))
      }
      function getSortedText(){
        let sortByText;

        if (tag.sortBy === 'importance') {
          sortByText = 'Sorted by Importance';
        } else if (tag.sortBy === 'dueDate') {
          sortByText = 'Sorted by Due Date';
        } else if (tag.sortBy === 'createdAt') {
          sortByText = 'Sorted by Creation Date';
        } else if (tag.sortBy === 'alphabetically') {
          sortByText = 'Sorted Alphabetically';
        } else {
          sortByText = 'Unknown Sorting';
        }
      
        return sortByText
      }
  return (
    <div>
        <div className='flex items-center space-x-3'>
            <div>
                <div className='flex items-center space-x-3'>
                    <div className='hidden md:block'>
                    {
                        tag.icon?
                        tag.icon.includes(':')?
                        <Icon color='#225FFC' icon={tag.icon} width={30}/>:
                        <Emoji/>:
                        <Icon color='black' icon="mi:list" width={40}/>
                    }
                    </div>
                  
                    <h1 className='font-semibold text-2xl sm:text-3xl md:text-3xl 2xl:text-3xl truncate'>
                    {tag.name}
                </h1>
                </div>
            </div>
            <div className='flex items-center justify-between w-full'>
                    <Tooltip title="Categorie menu">
                        <div>
                            <PopoverButton icon="ph:dots-three-bold" text="Settings" elements={menuSettingsElement}/>
                        </div>
                    </Tooltip>
                <div className='flex space-x-4 font-medium '>
                    {
                        tag.sortBy && 
                        <>
                           <div className='font-semibold text-sm flex justify.center items-center px-2 space-x-1'>
                                <div onClick={toggleSortOrder} className='cursor-pointer' >
                                    {tag.sortOrder == 'desc'? 
                                    <Icon icon="majesticons:chevron-up" width={20}/>:
                                    <Icon icon="majesticons:chevron-down" width={20}/>
                                }
                                </div>
                                <span>
                                    {
                                        getSortedText()
                                    }
                                </span> 
                                <Icon onClick={removeSortBy} className='cursor-pointer' icon="basil:cross-outline" width={20} />

                            </div>
                        </>
                    }
                 
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
