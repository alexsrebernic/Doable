import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { LeftSidebar } from '../../layouts/LeftSidebar/LeftSidebar'
import { Topbar } from '../../layouts/Topbar/Topbar'
import { useSpring } from '@react-spring/web'
import { RightSidebar } from '../../layouts/RightSidebar/RightSidebar'
import { AppContext } from '../../App'
export const RootLayout = () => {
  const {sidebar} = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if(location.pathname === "/"){
      navigate("/tasks/myday")
    }
  })
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }))
  function openAnimationSidebar(){
    api.start({
      from: {
        x: -400,
      },
      to: {
        x: 0,
      },
    })
  }
  return (
    <>
      <Topbar openAnimationSidebar={openAnimationSidebar}/>
      <div className={`flex-1  h-full  w-screen grid grid-cols-16  mt-14 lg:mt-0`}>
        <LeftSidebar springs={springs}/>
        <div className={` col-span-16 lg:col-span-12 xl:col-span-13 2xl:col-span-13 grid grid-cols-16 h-full`}>
          <div className={`col-span-16  xl:col-span-12 2xl:col-span-12 bg-[#F3F3F3] p-5  2xl:p-10 `}>
              <Outlet/>
          </div>
          <RightSidebar/>
        </div>
      </div>
    </>
  )
}
