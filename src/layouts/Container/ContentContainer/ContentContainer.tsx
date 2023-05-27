import React from 'react'

export const ContentContainer = ({children} : {children: React.ReactNode} ) => {
  return (
    <div className='container  h-screen     col-span-12 lg:col-span-9 xl:col-span-10'>
        {children}
    </div>

  )
}
