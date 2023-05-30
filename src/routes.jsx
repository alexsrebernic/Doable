import Root, {rootLoader} from './pages/Root/Root'
import Home from './pages/Home/Home'
import { Navbar } from './layouts/Navbar/Navbar'
import { ContentSidebar } from './layouts/ContentSidebar/ContentSidebar'
import { Settings } from './pages/Settings/Settings'
import ErrorPage from './pages/Error/Error'
import { Outlet } from 'react-router-dom'
import {About} from './pages/About/About'
export default [
    {
      path: "/",
      element:<Root />,
      errorElement:<ErrorPage/>,
      children: [
        {
         path:"/tasks",
         errorElement:<ErrorPage/>,
         element:<Outlet/>,
          children:[
            {
              path:"home",
              element:<Home/>
            },
            {
             path:"myday",
             element:<Home/>
           },
           {
             path:"important",
             element:<Home/>
           },
           {
             path:"completed",
             element:<Home/>
           },
           {
             path:"all",
             element:<Home/>
           },
           {
             path:":taskname",
             element:<Home/>
           },
          ]
        }
      ]
    },
    {
      path:"/stats",
      element:<Home/>
    },
    {
     path:"/settings",
     element:<Settings/>
    },
    {
     path:"/about",
     element:<About/>
    },
   ]