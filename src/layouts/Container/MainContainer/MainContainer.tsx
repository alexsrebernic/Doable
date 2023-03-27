import React from 'react'

export const MainContainer = ({children} : {children: React.ReactNode} ) => {
  return (
    <div className='min-h-screen min-w-screen main-bg-gradient font-montserrat'>
        {children}
    </div>

  )
}
