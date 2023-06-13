import React, { useEffect } from 'react'
import Task from '../../../../types/Task/Task'
import { TaskItem } from './TaskItem'
import { useSpring, animated } from '@react-spring/web'
export const TasksContainer = ({tasks} : {tasks:Task[] | null}) => {
  const springs = useSpring({
    from:{
      y:-30,
      opacity:0
    },
    to: {
      y:0,
      opacity:1
    },
    repeat:true,
  })
  return (
    <animated.div style={springs} className="my-5" >
      <div className='space-y-2'>
        { tasks &&
          tasks.map((t,i) => {
            return (
              <TaskItem task={t} key={i}/>
            )
          })
        }
      </div>
    </animated.div>
  )
}
