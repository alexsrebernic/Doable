import React from 'react'

export const ContentContainer = ({children} : {children: React.ReactNode} ) => {
  return (
    <div className='flex-1  h-full 2xl:h-screen w-screen grid grid-cols-16   '>
      {children}
    </div>

  )
}
