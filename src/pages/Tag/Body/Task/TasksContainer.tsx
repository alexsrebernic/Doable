import React, { useEffect, useState } from 'react'
import Task from '../../../../types/Task/Task'
import { useSpring, animated } from '@react-spring/web'
import { Tag } from '../../../../types/Tag/Tag'
import { TaskList } from './TaskList'
import { useDispatch } from 'react-redux'
interface Props {
  tasks : Task[] | [],
  tag : Tag,
  reverseAnimation?:boolean,
  route: string
}
export const TasksContainer = ({tasks,tag,reverseAnimation,route} : Props) => {
  const dispatch = useDispatch()
  const [resetAnimation, setResetAnimation] = useState(true)
  const [springs, api] = useSpring(() => ({
    from:{
      y:-30,
      opacity:0,
    },
  }))
  function fadeInAnimation(){
    api.start({
      from:{
        y:-30,
        opacity:0,
      },
      to: {
        y:0,
        opacity:1,
  
      },
      reset: true,
      reverse: reverseAnimation? reverseAnimation : false,
    })
  }
  useEffect(() => {
    fadeInAnimation()
  },[route])
 
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
      case 'importance' :return tasks.sort((a, b) => {
        return tag.sortOrder === 'asc' ? a.important - b.important : b.important - a.important;
      });
      default: return sortTasksByTagOrder(tasks,tag);
    
    }
  }
  const sortTasksByTagOrder = (tasks : Task[], tag : Tag) => {
    if (!tag || !tag.tasksIds || tag.tasksIds.length === 0 || tag.id == 'all') {
      return tasks; 
    }
    const sortedTasks = [];
    for (const taskId of tag.tasksIds) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        sortedTasks.push(task);
      }
    }
    return sortedTasks;
  };
  return (
    <animated.div style={springs}  className='  flex'>
      <TaskList tasks={sortTasks()} tag={tag} />
    </animated.div>
  )
}
