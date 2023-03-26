import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link } from '../Link'
import { Button } from '../../../common/Button/Button'
export const NavigationBarMobile = ({paths}:{paths:object[]}) => {
    const [isCollapsed, setCollapsed] = useState(false)
    const collapse = () => setCollapsed((oldValue) => !oldValue);
    return (
        <div className='md:hidden'>
            <button onClick={collapse}>
                <GiHamburgerMenu />
            </button>
            {isCollapsed && 
            <div className='absolute w-screen top-[3rem] left-0  bg-white   py-3 px-5 mx-auto'>
                <ul className='flex flex-col text-xl space-y-3'>
                    {paths.map((o,i) => {
                        return <Link {...o} key={i}/>
                    })}
                </ul>
                <div className='flex items-center justify-center mt-3'>
                    <Button size='md' text='Log in' type='neutral' border={false} hover="hover:text-gray-500"/>
                    <Button size='md' text='Sign up' type='neutral' hover='hover:text-gray-500 hover:border-gray-500'/>
                </div>
            </div>
            }
        </div>
    )
}
