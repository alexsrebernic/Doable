import React from 'react'
import { Icon } from '@iconify/react'
import BasicDateCalendar from './BasicDateCalendar'
import BasicDropdown from '../../../common/Dropdown/Dropdown'
import { TaskItem } from './TaskItem'
import dayjs, { Dayjs } from 'dayjs';
import { useSelector } from 'react-redux'
import { selectTasksByDueDate } from '../../../store/slices/tasksSlice'
import { useState } from 'react'
export const CalendarData = ({func}) => {
    const [dateSelected, setDateSelected] = useState<string | Dayjs>(dayjs(new Date()))
    const tasks = useSelector(selectTasksByDueDate(dateSelected.hasOwnProperty("$d")? dateSelected.$d : dateSelected))

  return (
    <div>
       <div>
          <div className='py-4   px-4 flex xl:hidden border-b justify-between  space-x-3'>
              <div className='cursor-pointer' onClick={func}>
                <Icon color='#225FFC' icon="mdi:menu-close" width={40}/>
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
              <ul className='text-center space-y-2 mt-1  max-h-full mb-6'>
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
    </div>
  )
}
