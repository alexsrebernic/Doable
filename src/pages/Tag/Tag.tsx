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
import { selectTagById, selectTags } from '../../store/slices/tagsSlice'
import { selectTasksByTagId } from '../../store/slices/tasksSlice'
import { useSelector } from 'react-redux'
export const Tag = () => {
  const navigate = useNavigate()
  const {showToast} = useContext(AppContext)
  const {tag_id} = useParams()
  const [isLoading,setIsLoading] = useState(false)
  const tag = useSelector(selectTagById(tag_id)) 
  const tasks = useSelector(selectTasksByTagId(tag_id));

  useEffect(() => {
    try {
      setIsLoading(true)
      if(!tag) throw Error("ERROR 404: Tag doesn´t exists");
      setIsLoading(false)
    } catch (error){
      setIsLoading(false)
      showToast(error.message,"error")
      console.error(error)
      navigate("/tasks/myday")
    }
  },[tag_id])
  
  return (
    <div className=''>
      {(tag && tasks) && 
      <>
        <Header tag={tag}/>
        <div className='my-5'>
          {tag.id !== 'completed' && 
          <>
            <CreateTaskContainer tag={tag} route={tag_id}/>
          </>}
          <TasksContainer tag={tag} tasks={tag.id !== 'completed'?(() => tasks.filter(t => !t.completed))(): (() => tasks.filter(t => t.completed))() }/>
          {tasks.every(task => !task.completed) || tag.id === 'completed' || tag.id === 'important'? null :
            <>
              <GroupTasksContainer tag={tag} tasks={(() => tasks.filter(t => t.completed))()} text="Completed"/>
            </>
          }
        </div>
      </>
      }
    </div>
  )
}
