import React from 'react'

export const Container = ({children} : {children: React.ReactNode} ) => {
  return (
    <div className='container main-bg min-h-screen max-w-screen-2xl mx-auto'>
        {children}
    </div>

  )
}