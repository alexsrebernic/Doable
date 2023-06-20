import React, { useEffect } from 'react'
import Task from '../../../../types/Task/Task'
import { TaskItem } from './TaskItem'
import { useSpring, animated } from '@react-spring/web'
import { Tag } from '../../../../types/Tag/Tag'
interface Props {
  tasks : Task[] | [],
  tag : Tag,
  reverseAnimation?:boolean
}
export const TasksContainer = ({tasks,tag,reverseAnimation} : Props) => {
  const springs = useSpring({
    from:{
      y:-30,
      opacity:0,
    },
    to: {
      y:0,
      opacity:1,

    },
    repeat:true,
    reset:true,
    reverse:reverseAnimation? reverseAnimation : false,
  })
  function sortTasks(){
    switch(tag.sortBy){
      case 'alphabetically':return tasks.sort((a, b) => {
        const compare = a.text.localeCompare(b.text);
        return tag.sortOrder === 'asc' ? compare : -compare;
      });
      case 'createdAt' :return tasks.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return tag.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
      case 'dueDate' :return tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return tag.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
      default :return tasks.sort((a, b) => {
        return tag.sortOrder === 'asc' ? a.important - b.important : b.important - a.important;
      });
    }
  }
  
  return (
    <animated.div style={springs} className="my-5" >
      <div className='space-y-2'>
        { tasks &&
          sortTasks().map((t,i) => {
            return (
              <TaskItem task={t} key={i}/>
            )
          })
        }
      </div>
    </animated.div>
  )
}
