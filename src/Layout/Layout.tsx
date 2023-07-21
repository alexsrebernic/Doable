import React, { useEffect, useState, useContext } from 'react'
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { LeftSidebar } from './LeftSidebar/LeftSidebar'
import { Topbar } from './Topbar/Topbar'
import { useSpring } from '@react-spring/web'
import { RightSidebar } from './RightSidebar/RightSidebar'
import { AppContext } from '../App'
export const Layout = () => {
  const {sidebar,helpSidebar} = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if(location.pathname === "/"){
      navigate("/tasks/myday")
    }
  })
  const [springsLeftBar, apiLeftBar] = useSpring(() => ({
    from: { x: 0 },
  }))
  function openAnimationLeftSidebar(){
    apiLeftBar.start({
      from: {
        x: -400,
      },
      to: {
        x: 0,
      },
    })
  }
  const [springsRightBar, apiRightBar] = useSpring(() => ({
    from: { x: 0 },
  }))
  function openAnimationRightSidebar(){
    if(window.innerWidth > 1243) return
    apiRightBar.start({
      from: {
        x: 400,
      },
      to: {
        x: 0,
      },
    })
  }
  useEffect(() => {
    if(helpSidebar.taskId) openAnimationRightSidebar()
  },[helpSidebar.taskId])
  return (
    <>
      <Topbar openAnimationLeftSidebar={openAnimationLeftSidebar} openAnimationRightSidebar={openAnimationRightSidebar}/>
      <div className={` flex-1 h-full  w-screen grid grid-cols-16 overflow-hidden `}>
        <LeftSidebar springs={springsLeftBar}/>
        <div className={` col-span-16 lg:col-span-12 xl:col-span-13 2xl:col-span-13 grid grid-cols-16 overflow-hidden`}>
          <div className={`col-span-16  xl:col-span-12 2xl:col-span-12 bg-[#F3F3F3] p-5  2xl:p-10 h-full overflow-hidden`}>
              <Outlet/>
          </div>
          <RightSidebar springs={springsRightBar}/>
        </div>
      </div>
    </>
  )
}
