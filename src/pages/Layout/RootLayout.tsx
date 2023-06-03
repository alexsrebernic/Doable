import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { Sidebar } from '../../layouts/Sidebar/Sidebar'
import { MainContainer } from '../../layouts/Container/MainContainer/MainContainer'
import { RouterContainer } from '../../layouts/Container/RouterContainer/RouterContainer'
import {ContentContainer} from '../../layouts/Container/ContentContainer/ContentContainer'
import { Topbar } from '../../layouts/Topbar/Topbar'
import { useSpring } from '@react-spring/web'
export const RootLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDataFetched, setIsDataFetched] = useState(false)
  useEffect(() => {
    settingApp()
  })
  function settingApp(){
    try {
      console.log("Getting user info, data, fetching...")
      console.log(isDataFetched,location.pathname)
      if(!isDataFetched && location.pathname === "/"){
        setIsDataFetched(true)
        navigate("/tasks/myday")
        console.log("Data getted, now redirecting to home")
      }
    } catch(e){
      throw e
    }
    
  }
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
      <ContentContainer>
        <Sidebar springs={springs}/>
            <RouterContainer>
                <Outlet/>
            </RouterContainer>
      </ContentContainer>
    </>
  )
}
