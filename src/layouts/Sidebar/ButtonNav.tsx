import React from 'react'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
interface Props {
    text : string,
    icon: string,
    path: string,
    activePath: boolean,
    number: number
}
export const ButtonNav = ({text,icon, path, activePath, number} : Props) => {

    const classActivePath = 'bg-[#225FFC] text-white'
    const hoverActivePath = 'hover:bg-[#80A3FE] hover:text-white'
    const focusActivePath = 'focus:bg-[#80A3FE] focus:text-white'

  return (
    <button onClick={() => console.log(path)} className={`${activePath? classActivePath : ''} ${focusActivePath} group transition ${hoverActivePath} rounded-xl w-full py-2 px-4 flex items-center justify-between `}>
        <div className='flex items-center space-x-3'>
            <Icon className='group-hover:text-white text-[#225FFC] group-focus:text-white transition' icon={icon}  width={26}/>
            <span className='font-semibold text-lg'>
                {text}
            </span> 
        </div>
        {
            (number && number > 0) &&  
            <span className='bg-[#D9D9D9] text-[#8A8A8A] text-center group-hover:bg-transparent group-focus:text-white group-hover:text-white rounded-full w-8 font-semibold p-0.5 transition'>
                {number}
            </span>
        }
    </button>
    )
}
