import React from 'react'
import { Tag } from '../../types/Tag/Tag'
import { ButtonNav } from './ButtonNav'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser, updateUserProp } from '../../store/slices/userSlice'
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
    function handleDrop(){
        console.log(user)
        const updatedTagsIds = [...user.tagsIds] 
        const draggedItemContent = updatedTagsIds.splice(draggedTagIndex, 1)[0];
        updatedTagsIds.splice(dragOverTagIndex, 0, draggedItemContent);
        dispatch(updateUserProp({prop: 'tagsIds',value : updatedTagsIds}))
        setDraggedElementIndex(null)
        setOverElementIndex(null)
    }
    return (
    <div onDrop={handleDrop}>
        { 
            tags &&
            tags.map((o : Tag, index : number) => {
                return (
                    <div
                        key={o.id} 
                        draggable
                        onDragStart={() => setDraggedElementIndex(index)}
                        onDragEnter={() => setOverElementIndex(index)}
                        onDragOver={(e : React.DragEvent) => e.preventDefault()}
                        onDragEnd={() => setDraggedElementIndex(null)}
                    >
                         <ButtonNav 
                            notFavorite={true} 
                            func={func} 
                            text={o.name} 
                            icon={o.icon} 
                            fullPath={`tasks/${o.id}`}  
                            number={0} 
                            key={index}
                            isDragOver={index == dragOverTagIndex}
                            isDragged={index == draggedTagIndex}
                         />
                    </div>
                )
            
            })
        }
    </div>
  )
}
