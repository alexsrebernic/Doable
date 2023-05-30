import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Sidebar } from './layouts/Sidebar/Sidebar'
import { MainContainer } from './layouts/Container/MainContainer/MainContainer'
import { RouterContainer } from './layouts/Container/RouterContainer/RouterContainer'
import {ContentContainer} from './layouts/Container/ContentContainer/ContentContainer'
import { 
  createBrowserRouter,
  RouterProvider } from 'react-router-dom'
import { config } from 'dotenv'
import { Topbar } from './layouts/Topbar/Topbar'
import routes from './routes.jsx'
const opts = {
  basename:"/tasks/home"
}
const router = createBrowserRouter(
  routes,
  opts
  
)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainContainer>
      <Topbar/>
      <ContentContainer>
        <Sidebar/>
            <RouterContainer>
                <RouterProvider router={router}/>
            </RouterContainer>
      </ContentContainer>
    </MainContainer>
  </React.StrictMode>
)
