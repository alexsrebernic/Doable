import React from 'react'
import { ContentSidebar } from '../../ContentSidebar/ContentSidebar'
export const RouterContainer = ({children} : {children: React.ReactNode} ) => {
  return (
    <div className='col-span-16 lg:col-span-12 xl:col-span-13 2xl:col-span-13 grid grid-cols-16 h-full'>
      <div className='col-span-16  xl:col-span-12 2xl:col-span-12 bg-[#F3F3F3]'>
        {children}
      </div>
      <ContentSidebar/>
    </div>

  )
}
