import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link } from '../../../common/Link'
import { Button } from '../../../common/Button/Button'
export const NavigationBarMobile = ({paths}:{paths:object[]}) => {
    const [isCollapsed, setCollapsed] = useState(false)
    const collapse = () => setCollapsed((oldValue) => !oldValue);
    return (
        <div className='md:hidden '>
            <button onClick={collapse}>
                <GiHamburgerMenu size={23}/>
            </button>
            {isCollapsed && 
            <div onClick={collapse} className='h-screen absolute top-0 left-0 w-screen'>
                <div onClick={e => e.stopPropagation()} className=' main-bg absolute shadow-xl  w-screen top-[3rem] left-0     py-3 px-5 mx-auto'>
                    <ul className='flex flex-col text-xl space-y-3 '>
                        {paths.map((o,i) => {
                            return <Link {...o} key={i}/>
                        })}
                    </ul>
                    <div className='flex items-center justify-center mt-3'>
                        <Button size='sm' text='Log in' type='blank' border={false} shadow={false} hover="hover:text-gray-500"/>
                        <Button size='sm' text='Sign up' type='neutral' border={false} shadow={true} hover='  hover:shadow-xl'/>
                    </div>
                </div>
            </div>
          
            }
        </div>
    )
}
