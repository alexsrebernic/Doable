import React, { useState } from 'react'
import personalizedSVG from '../../../../assets/selectdate.svg'
import { useRef } from 'react';
import { Icon } from '@iconify/react';
export const ColorPalletePicker = ({setValue,tag}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(oldVal => !oldVal)
  const colors = [
    {
      gradient: 'linear-gradient(177deg, rgba(245,33,33,1) 1%, rgba(224,67,67,1) 25%, rgba(244,125,125,1) 59%, rgba(228,138,138,1) 100%)',
      color : '#f52121'
    },
    {
      gradient : 'linear-gradient(180deg, rgba(33,245,61,1) 1%, rgba(67,224,93,1) 25%, rgba(125,244,143,1) 59%, rgba(138,228,182,1) 100%)',
      color: '#21f53d'
    },
    {
      color : '#21dbf5',
      gradient : 'linear-gradient(180deg, rgba(33,219,245,1) 1%, rgba(67,207,224,1) 25%, rgba(125,244,241,1) 59%, rgba(138,227,228,1) 100%)'
    },
    {
      color: '#bd21f5',
      gradient: "linear-gradient(180deg, rgba(189,33,245,1) 1%, rgba(185,67,224,1) 25%, rgba(211,125,244,1) 59%, rgba(195,138,228,1) 100%)"
    },
    {
      gradient: "linear-gradient(180deg, rgba(245,33,165,1) 1%, rgba(224,67,162,1) 25%, rgba(244,125,175,1) 59%, rgba(228,138,202,1) 100%)",
      color: '#e48aca'
    },
    {
      color: "#225FFC",
      gradient: 'linear-gradient(177deg, rgba(34,95,252,1) 1%, rgba(67,110,224,1) 25%, rgba(66,77,233,1) 59%, rgba(76,92,237,1) 100%)'
    }
  ]
  return (
      <div className='relative'>
        <div onClick={toggleOpen} className={`flex items-center px-2 space-x-3 p-2 hover:bg-gray-200 transition cursor-pointer w-full`} >
            <div>
                <Icon width={23} color={tag.theme} icon='mdi:paint-outline'/>
            </div>
            <span>
            Change theme
            </span>
        </div>     
        {
          isOpen && 
          <div className='absolute top-15 right-0  min-h-full md:top-0 md:right-[auto] md:left-40 md:rigth-  bg-white shadow-md flex p-2 space-x-2 rounded-md  transition-opacity'>
              {
              colors.map((color,index) => {
                return (
                  <div onClick={() => {
                    setValue(color.color)
                  }} key={index} style={
                    {
                      "background": color.gradient
                    }
                  } className={`w-10 h-10 rounded-full m-1 ${tag.theme == color.color && 'border-2 border-solid border-[#225FFC] '} hover:opacity-80 transition cursor-pointer`}>
                  
                  </div>
                )
              })
              }
          </div>
        } 
       
      </div>
   
  )
}
