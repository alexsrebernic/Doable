import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/Home/Home'
import ErrorPage from './pages/Error/Error'
import './index.css'
import { Navbar } from './layouts/NavigationBar/Navigationbar'
import { MainContainer } from './layouts/Container/MainContainer/MainContainer'
import { ContentContainer } from './layouts/Container/ContentContainer/ContentContainer'
import {Tasks} from './pages/Tasks/Tasks'
import {About} from './pages/About/About'
import { 
  createBrowserRouter,
  RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
    {
      path: "/",
      element : <HomePage/>,
      errorElement: <ErrorPage/>
    },
    {
      path:"/tasks",
      element : <Tasks/>,
    },
    {
      path:"/about",
      element : <About/>,

    }
  ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainContainer>
      <>
        <Navbar/>
        <ContentContainer>
          <RouterProvider router={router}/>
        </ContentContainer>
      </>
    </MainContainer>
  </React.StrictMode>
)
