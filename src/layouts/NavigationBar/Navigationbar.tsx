import React, { useContext, useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Button } from '../../common/Button/Button'
import paths from '../../helper/routesPaths'
import { Link } from '../../common/Link'
import { NavigationBarMobile } from './NavigationBarMobile/NavigationBarMobile'
import { NavigationBarDesktop } from './NavigationBarDesktop/NavigationBarDesktop'
import {  ModalAndToastContext } from '../Container/MainContainer/MainContainer'
import { SignUp } from '../../common/modals/SignUp'
import { LogIn } from '../../common/modals/LogIn'
export const Navbar : React.FC = () => {
    const [loading, setLoading] = useState(false)
    const {openModal,closeModal,showToast} = useContext(ModalAndToastContext)
    return (
    <nav className='bg-transparent md:flex-col  font-montserrat flex items-center md:items-start justify-between   pt-4 lg:pt-6'>
        <div className='flex items-center justify-between w-full'>
            <a href="/">
                <h1 className='font-bold text-3xl'>
                    Doable™
                </h1>
            </a>
            <div className='hidden md:flex space-x-2 font-medium '>
                <Button func={() => openModal(<LogIn/>)}  size='sm' text='Log in' type='blank' border={false} shadow={false} hover="hover:text-gray-500"/>
                <Button func={() => openModal(<SignUp/>)} size='sm' text='Sign up' type='neutral' border={false} shadow={true} hover='  hover:shadow-xl'/>
            </div>
        </div>
        <NavigationBarMobile paths={paths}/>
        <NavigationBarDesktop paths={paths}/>
    </nav>
  )
}
