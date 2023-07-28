import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from './Header/Header'
import { AppContext } from '../../App'
import { TasksContainer } from './Body/Task/TasksContainer'
import { GroupTasksContainer } from './Body/Task/GroupTasksContainer'
import { selectTagById, selectTags } from '../../store/slices/tagsSlice'
import { selectTasksByTagId } from '../../store/slices/tasksSlice'
import { useSelector } from 'react-redux'
export const Tag = () => {
  const navigate = useNavigate()
  const {showToast,searchBarData} = useContext(AppContext)
  const {tag_id} = useParams()
  let tag = useSelector(selectTagById(tag_id)) 
  let tasks = useSelector(selectTasksByTagId(tag_id,searchBarData.state));
  useEffect(() => {
    try {
      if(document.readyState !== 'complete') return
      if(!tag) throw Error("ERROR 404: Tag doesn´t exists");
    } catch (error){
      showToast(error.message,"error")
      console.error(error)
      navigate("/tasks/myday")
    }
  },[tag_id,tasks])
  return (
    <div className='flex flex-col flex-1 max-h-full relative overflow-hidden'>
      {(tag && tasks)  && 
      <>
        {
          tag.id != 'search' && <Header  tag_id={tag_id} tag={tag}/>
        }
        <div className='mb-5 mt-2 flex flex-col   overflow-y-auto max-h-full '>
          <TasksContainer  route={tag_id} tag={tag} tasks={tag.id !== 'completed'?(() => tasks.filter(t => !t.completed))(): (() => tasks.filter(t => t.completed))() }/>
          {tasks.every(task => !task.completed) || tag.id === 'completed' || tag.id === 'important'? null :
            <>
              <GroupTasksContainer  route={tag_id} tag={tag} tasks={(() => tasks.filter(t => t.completed))()} text="Completed"/>
            </>
          }
        </div>
      </>
      }
    </div>
  )
}
