import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './pages/Error/Error'
import './index.css'
import { Navbar } from './layouts/NavigationBar/Navigationbar'
import { MainContainer } from './layouts/Container/MainContainer/MainContainer'
import { RouterContainer } from './layouts/Container/RouterContainer/RouterContainer'
import {ContentContainer} from './layouts/Container/ContentContainer/ContentContainer'
import Footer from './layouts/Footer/Footer'
import { Lists } from './pages/Lists/Lists'
import { About } from './pages/About/About'
import { Settings } from './pages/Settings/Settings'
import { 
  createBrowserRouter,
  RouterProvider } from 'react-router-dom'
import { config } from 'dotenv'

const HomePage = React.lazy(() => import('./pages/Home/Home'))

const router = createBrowserRouter([
    {
      path: "/",
      element : <HomePage/>,
      errorElement: <ErrorPage/>
    },
    {
      path:"/lists",
      element : <Lists/>,
    },
    {
      path:"/about",
      element : <About/>,

    },
    {
      path:"/settings",
      element : <Settings/>,
    }
  ])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainContainer>
      <ContentContainer>
        <>
          <Navbar/>
          <Suspense fallback={<div>Loading ...</div>}>
            <RouterContainer>
              <RouterProvider router={router}/>
            </RouterContainer>
          </Suspense>
        </>
      </ContentContainer>
      <Footer/>
    </MainContainer>
  </React.StrictMode>
)
