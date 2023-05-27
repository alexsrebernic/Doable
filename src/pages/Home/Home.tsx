import { useState } from 'react'
import { Stats } from './Stats/Stats'
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
    <h1>Home</h1>
    </>
  )
}

export default Home
