import React, { useState } from 'react'
import Task from '../../../../types/Task/Task'
import { TaskItem } from './TaskItem';
import { Tag } from '../../../../types/Tag/Tag';
import { tagsSlice, updateTagProp } from '../../../../store/slices/tagsSlice';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

export const ListItem = ({tasks,tag} : {tasks: Task[], tag: Tag}) => {
    const [draggedTaskIndex, setDraggedElementIndex] = useState<number | null>(null)
    const [dragOverTaskIndex, setOverElementIndex] = useState<number | null>(null)

    const dispatch = useDispatch()
   
    function handleDrop(){
        const updatedTaskIds = tag.hasOwnProperty('tasksIds')?[...tag.tasksIds] : tasks.map(t => t.id)
        const draggedItemContent = updatedTaskIds.splice(draggedTaskIndex, 1)[0];
        updatedTaskIds.splice(dragOverTaskIndex, 0, draggedItemContent);
        dispatch(updateTagProp({tagId: tag.id,prop: 'tasksIds',value : updatedTaskIds}))
        setDraggedElementIndex(null)
        setOverElementIndex(null)
    }
  return (
    <div 
        onDrop={(e : React.DragEvent) => handleDrop(e)} 
        onDragOver={(e) => e.preventDefault()} 
        className='space-y-2'>
        { tasks &&
            tasks.map((t,index) => {
            return (
                <div 
                    key={t.id} 
                    draggable
                    onDragStart={() => setDraggedElementIndex(index)}
                    onDragEnter={() => setOverElementIndex(index)}
                    onDragOver={(e : React.DragEvent) => e.preventDefault()}
                    onDragEnd={() => setDraggedElementIndex(null)}
                >
                    <TaskItem  task={t}   isDragged={draggedTaskIndex == index} isDragOver={dragOverTaskIndex == index} tag={tag}/>
                </div>
            )
            })
        }
    </div>
  )
}
