import React from 'react'

export const RouterContainer = ({children} : {children: React.ReactNode} ) => {
  return (
    <div className='grid grid-cols-12 mt-5'>
        {children}
    </div>

  )
}
