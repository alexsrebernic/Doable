import React from 'react'
import { Button } from '../../../common/Button/Button'
import { Link } from '../../../common/Link'
export const NavigationBarDesktop = ({paths} : {paths: object[]}) => {
  return (
       <div className='hidden md:flex w-full pt-3'>
            <div className='hidden md:flex w-full space-x-14  items-center justify-start text-xl lg:pl-15'>
                {paths.map((o,i) => {
                    return <Link {...o} key={i}/>
                })}
            </div>
        </div>
  )
}
