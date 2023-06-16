import React, { useState } from 'react'
import { Icon } from '@iconify/react';
interface Props {
  text : String ,

}
export const GroupTasksContainer = ({text} : Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(oldVal => !oldVal)
  return (
    <div onClick={toggleIsOpen} >
      <div className='flex'>
        <span className={`${isOpen? 'rotate-90' : ' rotate-0 '} transition inline-block`}>
            <Icon width={30} icon="carbon:chevron-right" />
          </span>
          <div>
            {text}
          </div>
      </div>
     
    </div>
  )
}
