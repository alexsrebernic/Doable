import React, { useContext } from 'react'
import { AppContext } from '../../App'
import { Icon } from '@iconify/react';

export const RightSidebar = () => {
  const {helpSidebar} = useContext(AppContext)
  const phoneClasses =  'absolute  inset-y-0 right-0   ' 
  const desktopClasses = 'xl:w-full xl:static xl:bg-transparent xl:block xl:border-l xl:col-span-4 2xl:col-span-3 2xl:col-span-4'
  return (
      <div onClick={(e) =>{
        e.stopPropagation()
        helpSidebar.func()}
        }  className={`${helpSidebar.state? phoneClasses : 'hidden'} ${desktopClasses} shadow-xl xl:shadow-none h-screen lg:h-full`}>
          <div onClick={(e) =>{
          e.stopPropagation()
        }}
        className=' bg-white w-full xl:w-full border-r xl:border-none h-full'>
            <div>
              <div className='py-4 px-4 flex xl:hidden border-b justify-between  space-x-3'>
                  <div onClick={helpSidebar.func}>
                    <Icon icon="mdi:menu-close" width={40}/>
                  </div>
              </div>
            </div>
          </div>
      </div>
  )
}
