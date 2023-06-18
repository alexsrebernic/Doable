import React from 'react'
import { Icon } from '@iconify/react';
import { NavLink, useNavigation } from 'react-router-dom';
interface Props {
    text : String,
    icon: String,
    fullPath: String,
    number: number,
    func: Function
}
export const ButtonNav = ({text,icon, fullPath, number, func} : Props) => {

    const activeClasses = 'bg-[#80A3FE] text-white '
  return (
    <NavLink to={fullPath}>
        {({isActive, isPending}) => (
            <>
            <div onClick={func} className={`${isActive? activeClasses : ''} hover:bg-[#80A3FE] my-2 hover:text-white group transition rounded-xl w-full py-2 px-4 flex items-center justify-between`}>
                <div className='flex items-center space-x-3'>
                    <Icon className={`${isActive? 'text-white':'text-[#225FFC] '}group-hover:text-white  group-focus:text-white transition`} icon={icon}  width={26}/>
                    <span className='font-semibold text-lg'>
                        {text}
                    </span> 
                </div>
                {
                    (number > 0) &&  
                    <span className={`${isActive? 'text-white bg-[#D9D9D9]' : ''}bg-[#D9D9D9] text-[#8A8A8A] text-center group-hover:bg-transparent group-focus:text-white group-hover:text-white rounded-full w-8 font-semibold p-0.5 transition`}>
                        {number}
                    </span>
                }
            </div>
           
            </>
        )}
       
    </NavLink>
    )
}
