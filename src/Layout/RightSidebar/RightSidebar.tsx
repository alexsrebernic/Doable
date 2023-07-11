import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { Icon } from '@iconify/react';
import BasicDateCalendar from './BasicDateCalendar';
import { animated } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { selectTodayTasks } from '../../store/slices/tasksSlice';
import { TaskItem } from './TaskItem';
export const RightSidebar = ({springs}) => {
  const [dateSelected, setDateSelected] = useState(null)
  const [task,setTask] = useState(null)
  const tasks = useSelector(selectTodayTasks())
  const {helpSidebar} = useContext(AppContext)
  const phoneClasses =  'absolute  inset-y-0 right-0   ' 
  const desktopClasses = 'xl:w-full xl:static xl:bg-transparent xl:block xl:border-l xl:col-span-4 2xl:col-span-3 2xl:col-span-4'
  return (
   
         <div onClick={(e) =>{
          e.stopPropagation()
          helpSidebar.func()}
          }  
          className={`
          ${helpSidebar.state? 
          phoneClasses :
           'hidden'} 
           ${desktopClasses} top-0   xl:static  h-screen xl:h-[95vh]  z-10 `}>
            <animated.div 
            style={{ ...springs}} 
            onClick={(e) =>{
              e.stopPropagation()
              }}
              className=' bg-white w-4/5 md:w-1/2 lg:w-full border-r lg:border-none h-full   '>
              <div 
              onClick={(e) =>{
              e.stopPropagation()
              helpSidebar.func()}
              }  
              className={`${helpSidebar.state? phoneClasses : 'hidden'} ${desktopClasses} shadow-xl xl:shadow-none h-screen lg:h-full`}>
                <div 
                onClick={(e) =>{
                  e.stopPropagation()
                }}
                className=' bg-white w-full xl:w-full border-r xl:border-none h-full'>
                    <div>
                      <div className='py-4 px-4 flex xl:hidden border-b justify-between  space-x-3'>
                          <div onClick={helpSidebar.func}>
                            <Icon icon="mdi:menu-close" width={40}/>
                          </div>
                      </div>
                    </div>
                    <div className='py-5'>
                      <BasicDateCalendar setDate={setDateSelected}/>
                      <div className='px-7 font-medium space-y-4'>
                        <div>
                          <span className='text-[#225FFC]' >Completed Tasks</span>
                          <ul className='text-center '>
                            {
                              tasks.length > 0?
                              <>
                              {
                                 tasks.filter(t => t.completed).map(t => {
                                  <TaskItem task={t}/>
                                })
                              }
                              </>
                              :
                              <div className='my-3'>
                                <span className='text-sm text-[#8A8A8A]'>
                                  No completed tasks for today!
                                </span>
                              </div>
                            }
                          </ul>
                        </div>
                        <div>
                          <span className='text-[#225FFC]'>Pending Tasks</span>
                          <ul className='text-center'>
                          {
                              tasks.length > 0?
                              <>
                              {
                                 tasks.filter(t => !t.completed).map(t => {
                                  <TaskItem task={t}/>
                                })
                              }
                              </>
                              :
                              <div className='my-3'>
                                <span className='text-sm text-center text-[#8A8A8A]'>
                                  No pending tasks for today!
                                </span>
                              </div>
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </animated.div>
        </div>
  )
}
