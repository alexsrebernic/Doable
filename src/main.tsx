import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/Home/Home'
import ErrorPage from './pages/Error/Error'
import './index.css'
import { Navbar } from './layouts/Navbar/Navbar'
import { Container } from './layouts/Container/Container'
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
    }
  ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Container>
      <>
        <Navbar/>
        <RouterProvider router={router}/>
      </>
    </Container>
  </React.StrictMode>
)
