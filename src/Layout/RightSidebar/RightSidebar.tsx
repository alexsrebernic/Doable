import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import { Icon } from '@iconify/react';
import BasicDateCalendar from './BasicDateCalendar';
import { animated } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { selectTasksByDueDate } from '../../store/slices/tasksSlice';
import { TaskItem } from './TaskItem';
import BasicDropdown from './Dropdown';
export const RightSidebar = ({springs}) => {
  const [dateSelected, setDateSelected] = useState(new Date())
  const [dropdownValue,setDropdownValue] = useState("Today")
  const [task,setTask] = useState(null)
  useEffect(() => {
    
  },[dropdownValue])
  const tasks = useSelector(selectTasksByDueDate(dateSelected.hasOwnProperty("$d")? dateSelected.$d : dateSelected))
  const {helpSidebar} = useContext(AppContext)
  const phoneClasses =  'absolute  inset-y-0 right-0   ' 
  const desktopClasses = 'xl:w-full xl:static xl:bg-transparent xl:block xl:border-l xl:col-span-4 2xl:col-span-3 2xl:col-span-4'
  return (
        <div onClick={(e) =>{
        e.stopPropagation()
        helpSidebar.func()}
        }  className={`${helpSidebar.state? phoneClasses : 'hidden'} ${desktopClasses} top-0   xl:static  h-screen xl:h-[95vh]  z-10 `}>
          <animated.div style={{ ...springs}} onClick={(e) =>{
            e.stopPropagation()
            }}
            className=' bg-white w-full border-r xl:border-none h-full   overflow-y-auto  pb-2'>
            <div 
              onClick={(e) =>{
              e.stopPropagation()
              helpSidebar.func()}
              }  
              >
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
                    <div className='py-5 space-y-3  max-h-full  '>
                      <BasicDateCalendar value={dateSelected} setDate={setDateSelected}/>
                      <div className='px-7 '>
                        <BasicDropdown 
                        text='Select'
                        items={[
                          'Today',
                          'This week',
                          'This month'
                        ]}
                        setFunction={setDropdownValue}
                        value={dropdownValue}
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
                                  No completed tasks for today!
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
