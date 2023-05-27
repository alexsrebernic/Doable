import React from 'react'

export const RouterContainer = ({children} : {children: React.ReactNode} ) => {
  return (
    <div className='grid grid-cols-12 '>
        {children}
    </div>

  )
}
