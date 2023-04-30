import React from 'react'

export const ContentContainer = ({children} : {children: React.ReactNode} ) => {
  return (
    <div className='container  min-h-screen max-w-screen-xl px-4 xl:px-0  mx-auto col-span-12 lg:col-span-9 xl:col-span-10'>
        {children}
    </div>

  )
}
