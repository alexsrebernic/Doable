import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Logo } from '../../common/Logo'
interface Props {
    toggleFunction? : Function
}
export const ContentSidebar = (props : Props) => {
  return (
    <div onClick={(e) => e.stopPropagation()} className='bg-[#5D4037] z-10 h-screen opacity-100  shadow-xl w-[80vw] md:w-[50vw] lg:w-full overflow-y-auto py-5 px-3'>
        <div className='text-white flex items-center justify-between text-left'>
            <Logo/>
            <div className='lg:hidden'>
                <GiHamburgerMenu size={25} onClick={props.toggleFunction}/>            
            </div>
        </div>

    </div>
  )
}
