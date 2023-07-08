import { Icon } from '@iconify/react';
import { AppContext } from '../../App'
import { useContext, useState } from 'react';
import { SearchInput } from './SearchInput';

export const Topbar = ({openAnimationSidebar}) => {
  const {sidebar,helpSidebar} = useContext(AppContext)
  const [message, setMessage] = useState('');

  const handleChange = (value: string) => {
    // 👇 Get input value from "event"
    setMessage(value);
  };
  function collapseSidebar(){
    if(helpSidebar.state) return helpSidebar.func()
    sidebar.func()
    openAnimationSidebar()
  }
  return (
    <div  className='  bg-white static  border-b w-screen grid grid-cols-16 '>
        <div className='hidden lg:block lg:col-span-4 xl:col-span-3 border-r 2xl:col-span-3'>
            <div  className=''>
              <div className='flex items-center px-4 py-3 space-x-3'>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9997 36.6667C21.333 36.6667 22.6663 36.5 23.833 36.1667C23.1663 35.3334 22.4997 34.3334 22.1663 33.1667C21.4997 33.3334 20.6663 33.3334 19.9997 33.3334C12.6663 33.3334 6.66634 27.3334 6.66634 20C6.66634 12.6667 12.6663 6.66671 19.9997 6.66671C21.333 6.66671 22.4997 6.83337 23.6663 7.16671L26.333 4.50004C24.333 3.83337 22.1663 3.33337 19.9997 3.33337C10.833 3.33337 3.33301 10.8334 3.33301 20C3.33301 29.1667 10.833 36.6667 19.9997 36.6667ZM10.833 19.1667L13.1663 16.8334L18.333 22L32.6663 7.66671L34.9997 10L18.333 26.6667L10.833 19.1667ZM31.6663 23.3334L29.5663 27.9167L24.9997 30L29.5663 32.1L31.6663 36.6667L33.7497 32.1L38.333 30L33.7497 27.9167L31.6663 23.3334Z" fill="black"/>
                  </svg>
                  <h1 className='text-3xl font-bold'>Doable</h1>
              </div>
            </div>
        </div>
        <div className='px-2 w-full sm:px-4 py-2 flex justify-between col-span-16 lg:col-span-12 xl:col-span-13  2xl:col-span-13'>
            <div className='flex justify-center items-center md:space-x-6 lg:space-x-0'>
                <div onClick={collapseSidebar} className='lg:hidden'>
                    <Icon icon="material-symbols:menu" width={40} />
                </div>
                  <SearchInput value={message} func={handleChange}/>
            </div>
            <div className='flex items-center space-x-3'>
                <Icon className='cursor-pointer' width={30} height={30} icon="material-symbols:settings" color="#225ffc" />
                <Icon className='cursor-pointer' width={30} height={30} icon="material-symbols:help-outline" color="#225ffc" />
                <div className='w-[30px] cursor-pointer h-[30px] bg-gray-200 rounded-full'>

                </div>
                <div onClick={helpSidebar.func} className='xl:hidden'>
                    <Icon width={30} height={30} icon="mdi:calendar" color="#225ffc" />
                </div>
            </div>
        </div>
    </div>
  )
}
