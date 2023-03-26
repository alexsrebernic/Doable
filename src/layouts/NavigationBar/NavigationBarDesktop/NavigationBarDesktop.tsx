import React from 'react'
import { Button } from '../../../common/Button/Button'
import { Link } from '../Link'
export const NavigationBarDesktop = ({paths} : {paths: object[]}) => {
  return (
       <div className='hidden md:flex w-full'>
            <div className='hidden md:flex w-full space-x-8 items-center justify-start pl-10 lg:pl-15'>
                {paths.map((o,i) => {
                    return <Link {...o} key={i}/>
                })}
            </div>
            <div className='hidden md:flex space-x-2 font-medium '>
                <Button size='sm' text='Log in' type='neutral' border={false} hover="hover:text-gray-500"/>
                <Button size='sm' text='Sign up' type='neutral' hover='hover:text-gray-500 hover:border-gray-500'/>
            </div>
        </div>
  )
}
