import { useState } from 'react'
import { CalendarCarrousel } from './components/CalendarCarrousel'
import usePhotosCalendarCarrousel from './hooks/usePhotosCalendarCarrousel'
import { Stats } from './Stats/Stats'
function Home() {
  // const photos = usePhotosCalendarCarrousel()
  return (
    <>
      <div className='col-span-12 pb-12'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='space-y-3  col-span-12 lg:col-span-8 xl:col-span-9 '>
            <CalendarCarrousel photos={[{}]}/>
          </div>
          <div className='col-span-12 lg:col-span-4 xl:col-span-3'>
            Today Tasks
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
