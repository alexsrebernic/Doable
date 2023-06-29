import React, { useEffect } from 'react'
import Task from '../../../../types/Task/Task'
import { useSpring, animated } from '@react-spring/web'
import { Tag } from '../../../../types/Tag/Tag'
import { ListItem } from './ListItem'
import { useDispatch } from 'react-redux'
interface Props {
  tasks : Task[] | [],
  tag : Tag,
  reverseAnimation?:boolean
}
export const TasksContainer = ({tasks,tag,reverseAnimation} : Props) => {
  const dispatch = useDispatch()
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
      case 'importance' :return tasks.sort((a, b) => {
        return tag.sortOrder === 'asc' ? a.important - b.important : b.important - a.important;
      });
      default: return sortTasksByTagOrder(tasks,tag);
    
    }
  }
  const sortTasksByTagOrder = (tasks : Task[], tag : Tag) => {
    if (!tag || !tag.tasksIds || tag.tasksIds.length === 0) {
      return tasks; // Si no hay tag o no tiene tasksIds, retorna el array de tareas sin cambios
    }
  
    const sortedTasks = [];
  
    // Itera sobre los IDs en el orden especificado por tasksIds y agrega las tareas correspondientes
    for (const taskId of tag.tasksIds) {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        sortedTasks.push(task);
      }
    }
  
    return sortedTasks;
  };
  return (
    <animated.div style={springs} className="my-5" >
      <ListItem tasks={sortTasks()} tag={tag} />
    </animated.div>
  )
}
