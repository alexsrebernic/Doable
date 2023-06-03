import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MainContainer } from './layouts/Container/MainContainer/MainContainer'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from './routes.js'

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
      <RouterProvider router={router}/>
    </MainContainer>
  </React.StrictMode>
)
