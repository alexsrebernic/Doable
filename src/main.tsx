import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Sidebar } from './layouts/Sidebar/Sidebar'
import { MainContainer } from './layouts/Container/MainContainer/MainContainer'
import { RouterContainer } from './layouts/Container/RouterContainer/RouterContainer'
import {ContentContainer} from './layouts/Container/ContentContainer/ContentContainer'
import { About } from './pages/About/About'
import { 
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider } from 'react-router-dom'
import { config } from 'dotenv'
import { Navbar } from './layouts/Navbar/Navbar'
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
      <Navbar/>
      <ContentContainer>
        <Sidebar/>
          <Suspense>
            <RouterContainer>
                <RouterProvider router={router}/>
            </RouterContainer>
          </Suspense>
      </ContentContainer>
    </MainContainer>
  </React.StrictMode>
)
