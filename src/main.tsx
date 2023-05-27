import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './pages/Error/Error'
import './index.css'
import { Sidebar } from './layouts/Sidebar/Sidebar'
import { MainContainer } from './layouts/Container/MainContainer/MainContainer'
import { RouterContainer } from './layouts/Container/RouterContainer/RouterContainer'
import {ContentContainer} from './layouts/Container/ContentContainer/ContentContainer'
import { About } from './pages/About/About'
import { Settings } from './pages/Settings/Settings'
import { 
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider } from 'react-router-dom'
import { config } from 'dotenv'
import Root, {rootLoader} from './pages/Root/Root'
import Home from './pages/Home/Home'

const routes = [
 {
   path: "/",
   element:<Root />,
   errorElement:<ErrorPage/>,
   children: [
     {
      path:"/tasks",
      errorElement:<ErrorPage/>,
      element:<Outlet/>,
       children:[
         {
           path:"home",
           element:<Home/>
         },
         {
          path:"myday",
          element:<Home/>
        },
        {
          path:"important",
          element:<Home/>
        },
        {
          path:"completed",
          element:<Home/>
        },
        {
          path:"all",
          element:<Home/>
        },
        {
          path:":taskname",
          element:<Home/>
        },
       ]
     }
   ]
 },
 {
   path:"/stats",
   element:<Home/>
 },
 {
  path:"/settings",
  element:<Settings/>
 },
 {
  path:"/about",
  element:<About/>
 },
]
const opts = {
  basename:"/"
}
const router = createBrowserRouter(
  routes,
  opts
  
)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainContainer>
      <Sidebar/>
      <ContentContainer>
        <>
          <Suspense>
            <RouterContainer>
              <RouterProvider router={router}/>
            </RouterContainer>
          </Suspense>
        </>
      </ContentContainer>
    </MainContainer>
  </React.StrictMode>
)
