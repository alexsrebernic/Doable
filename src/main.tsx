import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RootContainer } from './layouts/Container/MainContainer/RootContainer'
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
    <RootContainer>
      <RouterProvider router={router}/>
    </RootContainer>
  </React.StrictMode>
)
