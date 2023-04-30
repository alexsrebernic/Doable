import React, { useContext, useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Button } from '../../common/Button/Button'
import paths from '../../helper/routesPaths'
import { Link } from '../../common/Link'
import {  ModalAndToastContext } from '../Container/MainContainer/MainContainer'
import { SignUp } from '../../common/modals/SignUp'
import { LogIn } from '../../common/modals/LogIn'
import { ContentSidebar } from './ContentSidebar'
import { Logo } from '../../common/Logo'
export const Sidebar : React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const {openModal,closeModal,showToast} = useContext(ModalAndToastContext)
    const toggleCollapse = () => setIsCollapsed(beforeValue => !beforeValue)
    return (
    <nav className='   font-montserrat   flex-1 col-span-12  lg:col-span-3  text-center xl:col-span-2'>
            <div className='lg:hidden px-4 flex items-center pt-3'>
                    <GiHamburgerMenu onClick={toggleCollapse} size={25}/>
                {isCollapsed &&
                    <div  onClick={toggleCollapse} className='fixed z-10  top-0 left-0 w-screen h-screen  '
                    style={{
                        "backgroundColor": "rgba(0,0,0, 0.5)"
                    }}>
                        <ContentSidebar toggleFunction={toggleCollapse}/>
                    </div>
                }   
                <div className=' w-full  '>
                    <Logo/>
                </div>
            </div>
            <div className='hidden lg:block'>
                <ContentSidebar/>
            </div>
    </nav>
  )
}
