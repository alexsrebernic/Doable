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
export const Header = ({tag,tag_id} : {tag:Tag,tag_id: string}) => {
    const {showToast} = useContext(AppContext)
    const dispatch = useDispatch()
    const [tagName, setTagName] = useState<string>('')
    const [isChangingValue, setIsChangingValue] = useState<boolean>(false)
    useEffect(() => {
        setTagName(tag.name)
        checkIfInputAndValueAreEquals(tag.name)
    },[tag])
    function printList(){

    }
    function changeTheme(){

    }
    function removeTag(){

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
        },
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
        checkIfInputAndValueAreEquals(value)
        setTagName(value)
    }
    function checkIfInputAndValueAreEquals(value){
        if(value !== tag.name){
            setIsChangingValue(true)
       } else {
           setIsChangingValue(false)
       }
    }
    function handleChangeTagName(){
        return tagName.length > 0 ? dispatch(updateTagProp({tagId: tag.id,prop: 'name',value: tagName})) : showToast('ERROR: Tag must have a name','error')

    }
    function handleResetTagName(){
        setTagName(tag.name)
        checkIfInputAndValueAreEquals(tag.name)
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
                            <Icon color='#225FFC' icon={tag.icon} width={30}/>:
                            <Icon color='black' icon="mi:list" width={40}/>
                        }
                        </div>
                        {
                            favoriteTagsIds.includes(tag.id)?
                            <h1 
                        className={`font-semibold truncate text-2xl sm:text-3xl md:text-3xl 2xl:text-3xl  `}
                        >
                                {tag.name}
                            </h1>
                            :
                            <input 
                            onKeyDown={(event) => (event.key === 'Enter' && tagName.length > 0) && handleChangeTagName()}
                            style={{ width: tagName.length + 'ch' }}
                            value={tagName}
                            className={`focus:outline-none max-w-[6em] 2xl:max-w-[8em] overflow-x-auto font-semibold text-2xl sm:text-3xl md:text-3xl 2xl:text-3xl  bg-transparent`}
                            type="text"
                            onChange={handleInputTagName}
                            />
                        }
                      
                        {
                            isChangingValue &&
                            <div className='flex space-x-1 pl-2'>
                                <Icon onClick={handleChangeTagName} className='cursor-pointer'  icon="material-symbols:check" width={25} color='green'/>
                                <Icon onClick={handleResetTagName} className='cursor-pointer' icon="bx:x" width={25} color='red'/>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex items-center justify-between w-full'>
                            <div>
                                <PopoverButton removeText='Remove tag' value={!favoriteTagsIds.includes(tag.id)} removeValueFunc={removeTag} icon="ph:dots-three-bold" text="Settings" elements={menuSettingsElement}/>
                            </div>
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
                            <div>
                                <PopoverButton icon="bx:sort" text="Sort" elements={menuSortElement}/>
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
