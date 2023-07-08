import React from 'react'
import { Tag } from '../../types/Tag/Tag'
import { ButtonNav } from './ButtonNav'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserProp } from '../../store/slices/userSlice'
import { User } from '../../types/User'
import { setTags } from '../../store/slices/tagsSlice'
interface Props {
    tags: Tag[],
    func: Function
    user : User
}
export const TagList = ({tags,func,user} : Props) => {
    const [draggedTagIndex, setDraggedElementIndex] = useState<number | null>(null)
    const [dragOverTagIndex, setOverElementIndex] = useState<number | null>(null)
    const dispatch = useDispatch()
    function resetValues(){
        setDraggedElementIndex(null)
        setOverElementIndex(null)
    }
    function handleDrag(event,index,id){
        event.dataTransfer.setData('id',id);
        event.dataTransfer.setData('type','tag');
        setDraggedElementIndex(index)
    }
    function handleDrop(event){
        const id = event.dataTransfer.getData('id')
        const type = event.dataTransfer.getData('type')
        if(type === 'task'){
            resetValues()    
            return moveTaskToTag(id)
        }
        if(!user.tagsIds.includes(id)) return
        const updatedTagsIds = [...user.tagsIds] 
        const draggedItemContent = updatedTagsIds.splice(draggedTagIndex, 1)[0];
        updatedTagsIds.splice(dragOverTagIndex, 0, draggedItemContent);
        console.log(updatedTagsIds)
        dispatch(updateUserProp({prop: 'tagsIds',value : updatedTagsIds}))
        resetValues()
    }
    function moveTaskToTag(id){

    }
    return (
    <div 
    onDrop={handleDrop}
    onDragLeave={(e) => e.preventDefault()}
    >
        { 
            tags &&
            tags.map((o : Tag, index : number) => {
                return (
                    <div
                        key={o.id} 
                        draggable
                        onDragStart={(e) => handleDrag(e,index,o.id)}
                        onDragEnter={() => setOverElementIndex(index)}
                        onDragOver={(e : React.DragEvent) => e.preventDefault()}
                    >
                         <ButtonNav 
                            notFavorite={true} 
                            func={func} 
                            text={o.name} 
                            icon={o.icon} 
                            fullPath={`tasks/${o.id}`}  
                            number={0} 
                            key={index}
                            isDragOver={index == dragOverTagIndex && dragOverTagIndex !== draggedTagIndex}
                            isDragged={index == draggedTagIndex}
                         />
                    </div>
                )
            
            })
        }
    </div>
  )
}
