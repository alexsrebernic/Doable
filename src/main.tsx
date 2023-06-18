import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RootContainer } from './layouts/Container/RootContainer/RootContainer'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from './routes.js'
import { Provider } from 'react-redux';
import store from './store';
const opts = {
  basename:"/"
}
const router = createBrowserRouter(
  routes,
  opts
)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RootContainer>
        <RouterProvider router={router}/>
      </RootContainer>
    </Provider>
  </React.StrictMode>
)
