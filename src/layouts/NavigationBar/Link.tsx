import React from 'react'

export const Link = ({path,text,key} : {path:string,text:string, key?: React.Key}) => {
  return (
        <a className='hover:text-gray-400 transition' href={path}>{text}</a>
    )
}
