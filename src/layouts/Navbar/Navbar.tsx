import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Button } from '../../common/Button/Button'
import { Link } from './Link'
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
    <nav className='bg-transparent  font-montserrat flex items-center justify-between px-4 md:px-12 pt-3'>
        <div>
            <a href="/">
                <h1 className='font-bold text-2xl'>
                    Doable™
                </h1>
            </a>
        </div>
        <div className='md:hidden'>
            <GiHamburgerMenu/>
        </div>
        <div className='hidden md:flex w-full'>
            <div className='hidden md:flex w-full space-x-8 items-center justify-start pl-10 lg:pl-15'>
               {paths.map(o => {
                   return <Link {...o} />
               })}
            </div>
            <div className='hidden md:flex space-x-2 font-medium'>
                <Button size='sm' text='Log in' type='neutral' border={false} hover="text-gray-500"/>
                <Button size='sm' text='Sign up' type='neutral'/>
            </div>
        </div>
    </nav>
  )
}
