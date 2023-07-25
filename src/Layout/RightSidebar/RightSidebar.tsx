import React, { useContext } from 'react'
import { AppContext } from '../../App'
import { Icon } from '@iconify/react';
import { animated } from '@react-spring/web';
import { useSelector } from 'react-redux';
import { selectTaskById,  } from '../../store/slices/tasksSlice';
import { selectTagById } from '../../store/slices/tagsSlice';
import { TaskData } from './TaskData/TaskData';
import { CalendarData } from './Calendar/CalendarData';
export const RightSidebar = ({springs}) => {
  const {helpSidebar: {func,state,taskId,setTaskId}, modalIsOpen} = useContext(AppContext)

  const task = useSelector(selectTaskById(taskId));
  const tag = useSelector(selectTagById(task?.tagId))
 
  const phoneClasses =  'fixed  inset-y-0 right-0  top-0   w-screen  bg-black/[.4] ' 
  const desktopClasses = 'xl:w-full xl:static xl:bg-transparent xl:block xl:border-l xl:col-span-4 2xl:col-span-3 2xl:col-span-4'

  return (
        <div onClick={(e) =>{
        e.stopPropagation()
        func()
        if(taskId) setTaskId(null)
      }
        }  className={`${state? phoneClasses : 'hidden'} ${desktopClasses}    h-screen xl:h-[95vh]   ${modalIsOpen? 'z-0' : 'z-10'} `}>
          <animated.div style={{ ...springs}} onClick={(e) =>{
            e.stopPropagation()
            }}
            className=' bg-white ml-auto min-w-[250px] xl:w-full xl:mx-auto w-fit border-r xl:border-none h-full shadow-xl xl:shadow-none   overflow-y-auto  '>
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
                className=' bg-white  w-fit xl:w-full border-r xl:border-none h-full '>
                   {
                    taskId && task && tag? 
                      <TaskData task={task} tag={tag} func={func} setTaskId={setTaskId} />
                      :
                      <CalendarData func={func} />
                    }
                  </div>
              </div>
          </animated.div>
      </div>
  )
}
