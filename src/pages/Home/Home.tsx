import { useState } from 'react'
import { CalendarCarrouselContainer } from './components/CalendarCarrousel/CalendarCarrouselContainer'
import usePhotosCalendarCarrousel from './hooks/usePhotosCalendarCarrousel'
import { Stats } from './Stats/Stats'
import { TodayTasksContainer } from './components/TodayTasks/TodayTasksContainer'
import Task from '../../types/Task'
import { JsonCalendar } from 'json-calendar'
function Home() {
  // const photos = usePhotosCalendarCarrousel()
  const tasks : Task[] = [{
    owner:"Alex",
    text:"Hacer de comer",
    createdAt: new Date()
  }]
  return (
    <>
      <div className='col-span-12 '>
        <div className='grid grid-cols-12 gap-6'>
          <div className='space-y-3  col-span-12 lg:col-span-8 xl:col-span-9 '>
            <CalendarCarrouselContainer photos={[{}]}/>
          </div>
          <div className='col-span-12 lg:col-span-4 xl:col-span-3'>
            <TodayTasksContainer tasks={tasks}/>
          </div>
        </div>
        <div className='col-span-12 '>
          <Stats/>
        </div>
      </div>
    </>
  )
}

export default Home
