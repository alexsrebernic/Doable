import React, { useEffect, useRef, useState } from 'react'
import { Tag } from '../../../types/Tag/Tag'
import { Icon } from '@iconify/react'
import PopoverButton from '../PopoverButton/PopoverButton'
import { useDispatch } from 'react-redux'
import { updateTagProp } from '../../../store/slices/tagsSlice'
import { useContext } from 'react'
import { favoriteTagsIds } from '../../../helper/favoriteTag'
import { AppContext } from '../../../App'
import { CreateTaskContainer } from '../Body/CreateTask/CreateTaskContainer'
import { removeTag } from '../../../store/slices/tagsSlice'
import { useNavigate } from 'react-router-dom'
import { ColorPalletePicker } from './ColorPalletePicker'
export const Header = ({tag,tag_id} : {tag:Tag,tag_id: string}) => {
    const {showToast, helpSidebar} = useContext(AppContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [tagName, setTagName] = useState<string>('')
    useEffect(() => {
        setTagName(tag.name)
    },[tag])
    function printList(){

    }
    function changeTheme(color){
        dispatch(updateTagProp({tagId: tag.id,prop: 'theme',value : color}))
    }
    function removeTagHandler(){
        dispatch(removeTag(tag.id))
        helpSidebar.setTaskId(null)
        navigate('/tasks/myday')
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
        !favoriteTagsIds.includes(tag.id) &&
        {
            component: <ColorPalletePicker tag={tag} setValue={changeTheme}/>
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
    function handleInputTagName(event){
        const value = event.target.value
        setTagName(value)
    }
  
    function handleChangeTagName(){
        return tagName.length > 0 ? dispatch(updateTagProp({tagId: tag.id,prop: 'name',value: tagName})) : setTagName(tag.name)

    }

  return (
    <>
    {tag && 
    <div className='space-y-3'>
      <div>
            <div className='flex items-center space-x-3'>
                <div>
                    <div className='flex items-center sm:space-x-3'>
                        <div className='hidden md:block'>
                        {
                            tag.icon?
                            <Icon color="#225FFC" icon={tag.icon} width={30}/>:
                            <Icon color={tag.theme} icon="mi:list" width={40}/>
                        }
                        </div>
                        {
                            favoriteTagsIds.includes(tag.id)?
                            <h1 
                        className={`font-semibold text-[${tag.theme}] truncate text-2xl sm:text-3xl md:text-3xl 2xl:text-3xl  `}
                        >
                                {tag.name}
                            </h1>
                            :
                            <input 
                            onKeyDown={(event) => (event.key === 'Enter' && tagName.length > 0) && handleChangeTagName()}
                            style={{ width: tagName.length + 2 + 'ch',
                            color: tag.theme}}
                            value={tagName}
                            className={`px-2 max-w-[6em] md:max-w-[16em] 2xl:max-w-[20em] text-[${tag.theme}] overflow-x-auto font-semibold text-2xl sm:text-3xl md:text-3xl 2xl:text-3xl  bg-transparent`}
                            type="text"
                            onBlur={(e) => handleChangeTagName()}
                            onChange={handleInputTagName}
                            maxLength={30}
                            />
                        }
                    </div>
                </div>
                <div className='flex items-center justify-between w-full'>
                            <div>
                                <PopoverButton 
                                color={tag.theme} 
                                removeText='Remove tag' 
                                value={!favoriteTagsIds.includes(tag.id)} 
                                removeValueFunc={removeTagHandler} 
                                icon="ph:dots-three-bold" text="Settings" 
                                elements={menuSettingsElement}
                                />
                            </div>
                    <div className='flex space-x-4 font-medium '>
                        {
                            tag.sortBy && 
                            <>
                               <div className='font-semibold text-sm flex justify.center items-center px-2 space-x-1'>
                                    <div onClick={toggleSortOrder} className='cursor-pointer' >
                                        {tag.sortOrder == 'desc'? 
                                        <Icon color={tag.theme} icon="majesticons:chevron-up" width={20}/>:
                                        <Icon color={tag.theme} icon="majesticons:chevron-down" width={20}/>
                                    }
                                    </div>
                                    <span className='text-' style={
                                        {
                                            color: tag.theme
                                        }
                                    }>
                                        {
                                            getSortedText()
                                        }
                                    </span> 
                                    <Icon onClick={removeSortBy} color={tag.theme} className='cursor-pointer' icon="basil:cross-outline" width={20} />
    
                                </div>
                            </>
                        }
                            <div>
                                <PopoverButton color={tag.theme} icon="bx:sort" text="Sort" elements={menuSortElement}/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        {tag.id !== 'completed' && 
            <>
                <CreateTaskContainer  tag={tag} route={tag_id}/>
            </>
        }
    </div>
    }
    </>

  )
}
