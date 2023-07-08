import React from 'react'
import { Icon } from '@iconify/react';
import { NavLink, useNavigation } from 'react-router-dom';
import { Emoji } from 'emoji-picker-react';
interface Props {
    text : String,
    icon: String,
    fullPath: String,
    number: number,
    func: Function,
    notFavorite : Boolean,
    isDragged? : boolean,
    isDragOver?: boolean,
}
export const ButtonNav = ({text,icon, fullPath, number, func, notFavorite =false, isDragOver, isDragged} : Props) => {

    const activeClassesFavorite = 'bg-[#80A3FE] text-white hover:bg-[#80A3FE] hover:text-white '
    const activeClassesNonFavorite = 'bg-gray-200 transition text-black hover:bg-gray-200'

  return (
    <NavLink to={fullPath}>
        {({isActive, isPending}) => (
            <>
            <div onClick={func} className={
                `${isActive? 
                    notFavorite?  activeClassesNonFavorite : activeClassesFavorite 
                    : notFavorite?'text-black hover:bg-gray-200 ' : 'hover:bg-[#80A3FE] hover:text-white' 
                    }  
                 ${isDragOver && 'opacity-50'}
                 ${notFavorite && 'cursor-grab'}
                my-2  group transition rounded-xl w-full py-2 px-4 flex items-center justify-between`}>
                <div className='flex items-center overflow-hidden space-x-3'>
                    {
                        notFavorite?
                        <Icon className={`${isActive? 'text-gray-500':'text-black '}group-hover:text-gray-700  group-focus:text-gray-700 transition`} icon="mi:list"  width={26}/>
                        :
                        <Icon className={`${isActive? 'text-white':'text-[#225FFC] '}group-hover:text-white  group-focus:text-white transition`} icon={icon}  width={26}/>
                    }
                    <span className='font-medium text-lg truncate flex-1'>
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
