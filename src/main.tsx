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
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './store';
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
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer>
          <RouterProvider router={router}/>
        </RootContainer>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
