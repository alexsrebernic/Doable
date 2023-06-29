import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import Task from '../../../../types/Task/Task';
import { Tag } from '../../../../types/Tag/Tag';
import { TasksContainer } from './TasksContainer';
import { useSelector, useDispatch } from 'react-redux';
import { setComponentVariable } from '../../../../store/slices/componentsSlice';
interface Props {
  text : String ,
  tasks: Task[] | [],
  tag : Tag 
}
export const GroupTasksContainer = ({text, tasks, tag} : Props) => {
  const dispatch = useDispatch()
  const toggleIsOpen = () => dispatch(setComponentVariable({tagId: tag.id, variable: !isOpen}))
  const isOpen : boolean = useSelector(state => !state.component.hasOwnProperty(tag.id)? false : state.component[tag.id]);

  useEffect(() => {
    if (!isOpen) {
      dispatch(setComponentVariable({tagId: tag.id, variable: isOpen}))
    }
  }, [tag.id]);

  return (
    <div  >
      <div onClick={toggleIsOpen} className={`${!isOpen? 'border-b': ''} flex items-center space-x-5  py-3`}>
        <span className={`${!isOpen? 'rotate-0' : ' rotate-90 '} transition inline-block`}>
            <Icon width={25} icon="carbon:chevron-right" />
          </span>
          <div className='font-medium'>
            {text}
          </div>
      </div>
     <div>
       {
         isOpen && <TasksContainer reverseAnimation={!isOpen} tag={tag} tasks={tasks} />
       }
     </div>
    </div>
  )
}
