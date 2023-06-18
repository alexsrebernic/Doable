import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import favoriteTags, {favoriteTagsIds} from '../../helper/favoriteTag'
import {  Tag as TagType } from '../../types/Tag/Tag'
import { Header } from './Header/Header'
import { AppContext } from '../../layouts/Container/RootContainer/RootContainer'
import { CreateTaskContainer } from './Body/CreateTask/CreateTaskContainer'
import { TasksContainer } from './Body/Task/TasksContainer'
import Task from '../../types/Task/Task'
import { GroupTasksContainer } from './Body/Task/GroupTasksContainer'

export const Tag = () => {
  const navigate = useNavigate()
  const {showToast} = useContext(AppContext)
  const {tag_id} = useParams()
  const [tag,setTag] = useState<TagType | null>(null)
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    try {
      setIsLoading(true)
      
      setIsLoading(false)
    } catch (error){
      setIsLoading(false)
      showToast(error,"error")
      console.error(error)
    }
  
  })
  
  return (
    <div className=''>
      {tag && 
      <>
        <Header tag={tag}/>
        <div className='my-5'>
          {tag.id !== 'completed' && 
          <>
            <CreateTaskContainer/>
          </>}
          <TasksContainer tasks={tag.tasks}/>
          {tag.id !== 'completed' && 
          <>
            <GroupTasksContainer text="Completed"/>
          </>
          }
        </div>
      </>
      }
    </div>
  )
}
