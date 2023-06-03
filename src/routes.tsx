import { Stats } from './pages/Stats/Stats'
import { Settings } from './pages/Settings/Settings'
import Error404Page from './pages/Error/Error404'
import { Outlet } from 'react-router-dom'
import {About} from './pages/About/About'
import { Tag } from './pages/Tag/Tag'
import { RouteObject } from 'react-router-dom'
import { RootLayout } from './pages/Layout/RootLayout'

const routes : RouteObject[] = [
    {
      path: "/",
      element:<RootLayout/>,
      errorElement:<Error404Page/>,
      children: [
        {
         path:"tasks/:tag_id",
         errorElement:<Error404Page/>,
         element:<Tag/>,
        },
        {
          path:"stats",
          element:<Stats/>
        },
        {
         path:"settings",
         element:<Settings/>
        },
        {
         path:"about",
         element:<About/>
        },
      ]
    },
  
   ] 

export default routes