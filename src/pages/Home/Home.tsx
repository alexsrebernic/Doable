import { useState } from 'react'

function Home() {

  return (
    <>
      <div className='col-span-12'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='space-y-3  col-span-12 lg:col-span-8 xl:col-span-9 '>
            <div className='w-full aspect-[7/13] sm:aspect-[3/5] md:aspect-[12/10] lg:aspect-[15/14] 2xl:aspect-[4/3] shadow-xl rounded-2xl'>
              Calendar
            </div>
            <div>
              ...
            </div>
          </div>
          <div className='col-span-12 lg:col-span-4 xl:col-span-3'>
            Today Tasks
          </div>
        </div>
        <div className='col-span-12 '>
          Stats
        </div>
      </div>
    </>
  )
}

export default Home
