import React from 'react'
import { List } from '../../../types/List'
export const ListItem = ({title,color,Icon} : List) => {
  return (
    <div className='flex hover:bg-gray-300 hover:white p-2 transition rounded-md  items-center space-x-3 cursor-pointer'>
        <div>
            <Icon size={20} color={color}/>
        </div>
        <h1 className='font-medium '>
            {title}
        </h1>
      
    </div>
  )
}
