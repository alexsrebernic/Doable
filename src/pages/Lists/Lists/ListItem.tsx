import React from 'react'
import { List } from '../../../types/List'
export const ListItem = ({title,color,Icon} : List) => {
  return (
    <div className='flex  items-center space-x-3 cursor-pointer'>
        <div>
            <Icon size={20} color={color}/>
        </div>
        <h1 className='font-medium '>
            {title}
        </h1>
    </div>
  )
}
