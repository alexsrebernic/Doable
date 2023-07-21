import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import { Icon } from '@iconify/react';
import BasicDateCalendar from './Calendar/BasicDateCalendar';
import { animated } from '@react-spring/web';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskById, selectTasksByDueDate, toggleCompleted, toggleImportant } from '../../store/slices/tasksSlice';
import { TaskItem } from './TaskItem';
import BasicDropdown from '../../common/Dropdown/Dropdown';
import dayjs, { Dayjs } from 'dayjs';
import { selectTagById } from '../../store/slices/tagsSlice';
import {formatDate} from '../../helper/formatCreatedAtDate'
export const RightSidebar = ({springs}) => {
  const dispatch = useDispatch()
  const [dateSelected, setDateSelected] = useState<string | Dayjs>(dayjs(new Date()))
  const {helpSidebar: {func,state,taskId,setTaskId}} = useContext(AppContext)

  const tasks = useSelector(selectTasksByDueDate(dateSelected.hasOwnProperty("$d")? dateSelected.$d : dateSelected))
  const task = useSelector(selectTaskById(taskId));
  const tag = useSelector(selectTagById(task?.tagId))
  const [textTaskValue,setTextTaskValue] = useState<string | undefined>(task?.text || '')

  const handleToggleImportant = () => dispatch(toggleImportant(taskId))
  const handleToggleCompleted = () => dispatch(toggleCompleted(taskId))
  const phoneClasses =  'fixed  inset-y-0 right-0  top-0   w-screen  bg-black/[.4] ' 
  const desktopClasses = 'xl:w-full xl:static xl:bg-transparent xl:block xl:border-l xl:col-span-4 2xl:col-span-3 2xl:col-span-4'
  function handleCloseTaskSidebar(){
    func()
    setTaskId('')
  }
  return (
        <div onClick={(e) =>{
        e.stopPropagation()
        func()
        if(taskId) setTaskId(null)
      }
        }  className={`${state? phoneClasses : 'hidden'} ${desktopClasses}    h-screen xl:h-[95vh]  z-10 `}>
          <animated.div style={{ ...springs}} onClick={(e) =>{
            e.stopPropagation()
            }}
            className=' bg-white ml-auto min-w-[250px] xl:mx-auto w-fit border-r xl:border-none h-full shadow-xl xl:shadow-none   overflow-y-auto  pb-2'>
            <div 
              onClick={(e) =>{
              e.stopPropagation()
              func()}
              }  
              className='h-full'
              >
               
                <div 
                onClick={(e) =>{
                  e.stopPropagation()
                }}
                className=' bg-white  w-full xl:w-full border-r xl:border-none h-full'>
                   {
                    taskId? 
                      <div className='flex flex-col justify-between h-full '>
                        <div className='h-full'>
                          <div className='flex px-3 xl:px-0 pt-6'>
                            <div onClick={handleToggleCompleted} >
                                <div
                                 style={
                                  {
                                  border: `1px solid ${tag?.theme}`,
                                  backgroundColor: task?.completed? tag?.theme : 'transparent'  
                                  }
                                  }
                                className='w-6 h-6 rounded-full transition cursor-pointer'
                                >

                                </div>
                            </div>
                            <div className='w-full'>
                              <input type="text" />
                            </div>
                            <div>
                              <div onClick={handleToggleImportant} className=''>
                                {
                                  task!.important?
                                  <Icon width={25} className=' cursor-pointer' color={tag.theme} icon='ph:star-fill'/>:
                                  <Icon width={25} className=' cursor-pointer' color={tag.theme} icon='ph:star'/>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=' py-2 border-t-[1px] border-solid border-t-gray-200'>

                          <div className='flex items-center justify-between px-3'>
                            <div className='cursor-pointer ' onClick={handleCloseTaskSidebar}>
                                <Icon color={tag?.theme} icon="mdi:menu-close" width={30}/>
                            </div> 
                            <div>
                              <span className='text-sm font-medium'>
                                Created {formatDate(task?.createdAt)}
                              </span>
                            </div>
                            <div className='cursor-pointer'>
                              <Icon icon="ph:trash" color={tag?.theme} width={25}/>
                            </div>  
                          </div>
                        
                        </div>
                      </div>
                      :
                      <>
                      <div>
                        <div className='py-4 px-4 flex xl:hidden border-b justify-between  space-x-3'>
                            <div className='cursor-pointer' onClick={func}>
                              <Icon icon="mdi:menu-close" width={40}/>
                            </div>
                        </div>
                      </div>
                      <div className='py-5 space-y-3  max-h-full  '>
                        <BasicDateCalendar value={dateSelected} setValue={setDateSelected}/>
                        <div className='px-7 '>
                          <BasicDropdown 
                          text='Select'
                          items={[
                            'Today',
                            'This week',
                            'This month'
                          ]}
                          setFunction={setDateSelected}
                          />
                        </div>
                      
                        <div className='px-7 flex flex-col font-medium space-y-4 max-h-full '>
                          <div className='max-h-full flex-grow flex-1 '>
                            <span className='text-[#225FFC]' >Completed Tasks</span>
                            <ul className='text-center space-y-2 mt-1 max-h-full '>
                              {
                                tasks.filter(t => t.completed).length > 0?
                                <>
                                {
                                  tasks.filter(t => t.completed).map((t,i) => {
                                    return <TaskItem task={t} key={i}/>
                                  })
                                }
                                </>
                                :
                                <div className='my-3'>
                                  <span className='text-sm text-[#8A8A8A]'>
                                    . . .
                                  </span>
                                </div>
                              }
                            </ul>
                          </div>
                          <div className=' '>
                            <span className='text-[#225FFC] '>Pending Tasks</span>
                            <ul className='text-center space-y-2 mt-1  max-h-full '>
                            {
                                tasks.filter(t => !t.completed).length > 0?
                                <>
                                {
                                  tasks.filter(t => !t.completed).map((t,i) => {
                                    return <TaskItem task={t} key={i}/>
                                  })
                                }
                                </>
                                :
                                <div className='my-3'>
                                  <span className='text-sm text-center text-[#8A8A8A]'>
                                    . . .
                                  </span>
                                </div>
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                      </>
                    }
                  </div>
              </div>
          </animated.div>
      </div>
  )
}
