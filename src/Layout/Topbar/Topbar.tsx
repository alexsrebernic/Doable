import { Icon } from '@iconify/react';
import { AppContext } from '../../App'
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { SearchInput } from './SearchInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Popover } from '@mui/material';
import myPhoto from '../../assets/myPhoto.png'
import { logInUserWithGoogle,logOutUser  } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import PopoverButton from '../../pages/Tag/PopoverButton/PopoverButton';
export const Topbar = ({openAnimationLeftSidebar,openAnimationRightSidebar}) => {
  const {sidebar,helpSidebar ,searchBarData,user} = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : 'null';
  const handleChange = (value: string) => {
    if(location.pathname !== '/tasks/search') navigate('tasks/search')
    if(value.length == 0) navigate(-1)
    searchBarData.func(value);
  };
  function collapseLeftSidebar(){
    if(helpSidebar.state) return helpSidebar.func()
    sidebar.func()
    openAnimationLeftSidebar()
  }
  function collapseRightSidebar(){
    if(sidebar.state) return sidebar.func()
    helpSidebar.func()
    helpSidebar.setTaskId(null)
    openAnimationRightSidebar()
  }
  function displayLogIn(){
    try {
      dispatch(logInUserWithGoogle())
    } catch(error){
      console.error(error)
    }
  }
  function handleLogOutUser(){
    try {
      dispatch(logOutUser())
    } catch (error){
      console.error(error)
    }
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
                <div onClick={collapseLeftSidebar} className='lg:hidden'>
                    <Icon icon="material-symbols:menu" width={40} />
                </div>
                  <SearchInput value={searchBarData.state} func={handleChange}/>
            </div>
            <div className='flex items-center space-x-3 2xl:px-5'>
                <Icon onClick={handleClick} className='cursor-pointer' width={30} height={30} icon="material-symbols:help-outline" color="#225ffc" />
                  <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  style={
                    {
                      "overflow" : "visible !important"
                    }
                  }
                  className='overflow-visible'
              >
                  <div className='flex flex-col items-center justify-center font-montserrat my-3'>
                    <div className='border-b font-semibold px-4 py-2 text-lg '>
                      <h1 className='text-default'>
                        Created by
                      </h1>
                     
                    </div>
                    <div className='flex flex-col items-center justify-center py-2'>
                        <img src={myPhoto} className='rounded-full w-20 h-20 ' alt="" />
                      <span className='text-md font-medium py-1'>Alex Srebernic</span>
                    </div>
                    <div className='flex space-x-3'>
                      <a  target='_blank'  className='hover:text-default transition' href="https://stackoverflow.com/users/17751576/alexsc">
                        <Icon width={32} icon="mdi:stackoverflow" />
                      </a>
                      <a target='_blank'  className='hover:text-default transition' href="https://github.com/alexsrebernic">
                        <Icon width={32} icon="mdi:github" />
                      </a>
                      <a target='_blank'  className='hover:text-default transition' href="https://www.linkedin.com/in/alex-srebernic-201427213/">
                        <Icon width={32} icon="mdi:linkedin" />
                      </a>
                    </div>
                  </div>
                </Popover>
                {
                  user &&
                  <>
                  {
                    user.id !== 'anonymus'?
                    <PopoverButton
                    text='User settings'
                    elements={
                      [
                        {
                          icon: 'material-symbols:logout',
                          text: 'Log out',
                          func: handleLogOutUser,
                          arg: null
                        }
                      ]
                    }
                    contentButton={
                      <div className='w-[30px] cursor-pointer h-[30px] bg-gray-200 rounded-full'>
                      <img src={user.img} className='w-full h-full rounded-full' alt="" />
                      </div>
                      }
                    />
                   
                  :
                  <button onClick={displayLogIn} className='text-default font-semibold  px-3 hover:bg-[#80A3FE] hover:text-white py-2 rounded-md transition cursor-pointer' >
                    Log in
                  </button>
                  }
                  </>
                }
         
                
                <div onClick={collapseRightSidebar} className='xl:hidden'>
                    <Icon width={30} height={30} icon="mdi:calendar" color="#225ffc" />
                </div>
            </div>
        </div>
    </div>
  )
}
