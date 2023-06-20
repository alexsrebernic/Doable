import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import Task from '../../../../types/Task/Task';
import { Tag } from '../../../../types/Tag/Tag';
import { TasksContainer } from './TasksContainer';
interface Props {
  text : String ,
  tasks: Task[] | [],
  tag : Tag 
}
export const GroupTasksContainer = ({text, tasks, tag} : Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(oldVal => !oldVal)
  return (
    <div onClick={toggleIsOpen} >
      <div className={`${!isOpen? 'border-b': ''} flex items-center space-x-5  py-3`}>
        <span className={`${!isOpen? 'rotate-0' : ' rotate-90 '} transition inline-block`}>
            <Icon width={25} icon="carbon:chevron-right" />
          </span>
          <div className='font-medium'>
            {text}
          </div>
      </div>
     <div>
       {
         isOpen &&
         <>
           <TasksContainer reverseAnimation={!isOpen} tag={tag} tasks={tasks} />
         </>
       }
     </div>
    </div>
  )
}
