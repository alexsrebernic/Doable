import React, { useEffect, useState } from 'react'
import Task from '../../../../types/Task/Task'
import { TaskItem } from './TaskItem';
import { Tag } from '../../../../types/Tag/Tag';
import { tagsSlice, updateTagProp } from '../../../../store/slices/tagsSlice';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';

export const TaskList = ({tasks,tag} : {tasks: Task[], tag: Tag}) => {
    const [draggedTaskIndex, setDraggedElementIndex] = useState<number | null>(null)
    const [dragOverTaskIndex, setOverElementIndex] = useState<number | null>(null)
    const dispatch = useDispatch()
    useEffect(() => {
        resetValues()
    },[tag]) 

    function handleDrop(event){
        if(event.dataTransfer.getData('type') == 'tag') return resetValues()
        const dragOverId = tasks.map(t => t.id)[dragOverTaskIndex]
        const dragOverRealIndex = tag.tasksIds?.findIndex(id => id == dragOverId)
        const draggedId = tasks.map(t => t.id)[draggedTaskIndex]
        const draggedRealIndex = tag.tasksIds?.findIndex(id => id == draggedId)
        console.log(dragOverId,dragOverRealIndex,dragOverTaskIndex)
        const updatedTaskIds = [...tag.tasksIds] 
        const draggedItemContent = updatedTaskIds.splice(draggedRealIndex, 1)[0];
        updatedTaskIds.splice(dragOverRealIndex, 0, draggedItemContent);
        dispatch(updateTagProp({tagId: tag.id,prop: 'tasksIds',value : updatedTaskIds}))
        resetValues()
    }
    function resetValues(){
        setDraggedElementIndex(null)
        setOverElementIndex(null)
    }
  
    function handleDrag(event,index,id){
        event.dataTransfer.setData('id',id);
        event.dataTransfer.setData('type','task');
        console.log(event.dataTransfer.getData('type'))
        setDraggedElementIndex(index)
    }
  return (
    <div 
        onDrop={(e) => handleDrop(e)} 
        className='space-y-2  py-2 overflow-y-auto flex-1  relative '>
        { tasks &&
            tasks.map((t,index) => {
            return (
                <div 
                    key={t.id} 
                    draggable
                    onDragStart={(e) => handleDrag(e,index,t.id)}
                    onDragEnter={(e) => setOverElementIndex(index)}
                    onDragOver={(e : React.DragEvent) => e.preventDefault()}
                    onDragEnd={() => resetValues()}
                >
                    <TaskItem   task={t}   isDragged={draggedTaskIndex == index} isDragOver={dragOverTaskIndex == index} tag={tag}/>
                </div>
            )
            })
        }
    </div>
  )
}
