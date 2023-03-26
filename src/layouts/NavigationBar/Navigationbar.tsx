import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Button } from '../../common/Button/Button'
import { Link } from './Link'
import { NavigationBarMobile } from './NavigationBarMobile/NavigationBarMobile'
import { NavigationBarDesktop } from './NavigationBarDesktop/NavigationBarDesktop'
export const Navbar : React.FC = () => {
    const [loading, setLoading] = useState(false)
    interface Path {
        path: string,
        text: string
    }
    const paths: Path[] = [
        {
            path:'/',
            text:'Home'
        },
        {
            path:'/tasks',
            text:'Tasks'
        },
        {
            path:'/about',
            text:'About'
        }
    ]
    return (
    <nav className='bg-transparent  font-montserrat flex items-center justify-between px-4 md:px-12 pt-4 lg:pt-6'>
        <div>
            <a href="/">
                <h1 className='font-bold text-2xl'>
                    Doable™
                </h1>
            </a>
        </div>
        <NavigationBarMobile paths={paths}/>
        <NavigationBarDesktop paths={paths}/>
    </nav>
  )
}
