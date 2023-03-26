import React from 'react'

export const Link = ({path,text} : {path:string,text:string}) => {
  return (
        <a className='hover:text-gray-400 transition' href={path}>{text}</a>
    )
}
