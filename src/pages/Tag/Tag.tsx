import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import favoriteTags, {favoriteTagsIds} from '../../helper/favoriteTag'
import {  Tag as TagType } from '../../types/Tag/Tag'
import { Header } from './Header/Header'
import { AppContext } from '../../layouts/Container/MainContainer/RootContainer'
import { CreateTaskContainer } from './Body/CreateTask/CreateTaskContainer'
import { TasksContainer } from './Body/Task/TasksContainer'
import Task from '../../types/Task/Task'
import MockTask from '../../types/Task/Mocks/MockTask'
import { GroupTasksContainer } from './Body/Task/GroupTasksContainer'

export const Tag = () => {
  const navigate = useNavigate()
  const {showToast, tags} : {showToast:Function,tags:TagType[]} = useContext(AppContext)
  const {tag_id} = useParams()
  const [tag,setTag] = useState<TagType | null>(null)
  const [tasks,setTasks] = useState<Task[] | MockTask[] | null>(null)
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    if(tags){
      setIsLoading(true)
      if(!tag_id) {
        setIsLoading(false)
        return navigate('/tasks/myday')
      }
      let tag : TagType = tags.find(o => o.id == tag_id? o : null)
      setTag(tag)
      setIsLoading(false)
      if(!tag) return navigate("/tasks/myday")
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
