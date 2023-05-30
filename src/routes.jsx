import Root, {rootLoader} from './pages/Root/Root'
import Home from './pages/Home/Home'
import { Stats } from './pages/Stats/Stats'
import { Settings } from './pages/Settings/Settings'
import ErrorPage from './pages/Error/Error'
import { Outlet } from 'react-router-dom'
import {About} from './pages/About/About'
import {Myday} from './pages/Myday/Myday'
import {Important} from './pages/Important/Important'
import {Completed} from './pages/Completed/Completed'
import {All} from './pages/All/All'
import {UserTag} from './pages/UserTag/UserTag'
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
             element:<Myday/>
           },
           {
             path:"important",
             element:<Important/>
           },
           {
             path:"completed",
             element:<Completed/>
           },
           {
             path:"all",
             element:<All/>
           },
           {
             path:":tag_id",
             element:<UserTag/>
           },
          ]
        }
      ]
    },
    {
      path:"/stats",
      element:<Stats/>
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