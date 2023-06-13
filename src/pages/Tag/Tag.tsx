import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import favoriteTags, {favoriteTagsIds} from '../../helper/favoriteTag'
import {  Tag as TagType } from '../../types/Tag/Tag'
import { Header } from './Header/Header'
import { AppContext } from '../../layouts/Container/MainContainer/MainContainer'
import { CreateTaskContainer } from './Body/CreateTask/CreateTaskContainer'
import { TasksContainer } from './Body/Task/TasksContainer'
import Task from '../../types/Task/Task'
import MockTask from '../../types/Task/Mocks/MockTask'
import { GroupTasksContainer } from './Body/Task/GroupTasksContainer'

export const Tag = () => {
  const navigate = useNavigate()
  const {showToast, tags,setTags} : {showToast:Function,tags:TagType[]} = useContext(AppContext)
  const {tag_id} = useParams()
  const [tag,setTag] = useState<TagType | null | undefined>(null)
  const [tasks,setTasks] = useState<Task[] | MockTask[] | null | undefined>(null)
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    try {

    } catch(error){
      
    }
    if(tags){
      setIsLoading(true)
      if(!tag_id) {
        setIsLoading(false)
        return navigate('/tasks/myday')
      }
      let favoriteTag : TagType | undefined = favoriteTags.find(tag => tag.id == tag_id? tag : null) 
      if(!favoriteTag){ 
        let tag : TagType | undefined = tags.find(o => o.id == tag_id? o : null)
        setTag(tag)
        if(!tag) return navigate("/tasks/myday")
      } else {
        switch(true){
          case favoriteTag.id == 'completed': setCompletedTask() ;
          case favoriteTag.id == 'myday' : setMyDayTasks();
          case favoriteTag.id == 'all' : setAllTasks() ;
          case favoriteTag.id == 'important' : setImportantTasks();
        }
        favoriteTag.tasks = tags.find(o => o.id == favoriteTag!.id)?.tasks
        setTag(favoriteTag)
      }
      setTasks(tag?.tasks)
      setIsLoading(false)
    }
  })
  function setCompletedTask(){

  }
  function setMyDayTasks(){

  }
  function setAllTasks(){

  }
  function setImportantTasks(){

  }
  function getTag(){

  }
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
          <TasksContainer tasks={tasks}/>
          {tag.id !== 'completed' && 
          <>
            <GroupTasksContainer/>
          </>
          }
        </div>
      </>
      }
    </div>
  )
}
