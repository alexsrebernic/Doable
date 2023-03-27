import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/Home/Home'
import ErrorPage from './pages/Error/Error'
import './index.css'
import { Navbar } from './layouts/NavigationBar/Navigationbar'
import { MainContainer } from './layouts/Container/MainContainer/MainContainer'
import { RouterContainer } from './layouts/Container/RouterContainer/RouterContainer'
import {ContentContainer} from './layouts/Container/ContentContainer/ContentContainer'
import {Tasks} from './pages/Tasks/Tasks'
import {About} from './pages/About/About'
import Footer from './layouts/Footer/Footer'
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
      <ContentContainer>
        <>
          <Navbar/>
          <RouterContainer>
            <RouterProvider router={router}/>
          </RouterContainer>
        </>
      </ContentContainer>
      <Footer/>
    </MainContainer>
  </React.StrictMode>
)
