import React from 'react'
import {ImSpinner8} from 'react-icons/im'

interface Props {
    size: string, 
    type: string, 
    text: string, 
    hover?:string,
    loading?:Boolean, 
    border?: Boolean, 
}
export const Button = (
    {size = 'sm', 
    type = 'neutral', 
    text = 'Ok', 
    hover,
    loading = false, 
    border = true, 
} : Props
) => {
  const checker : () => string = () : string => {
    let sizeReturned: string;
    let typeReturned: string;
   if(size == 'sm'){
       sizeReturned = 'px-4 py-2 text-sm'
   } else if (size == 'md'){
       sizeReturned = 'px-5 py-5 text-md'
   } else if (size == 'lg'){
       sizeReturned = 'px-7 px-7 text-lg'
   } else if(size == 'xl'){
       sizeReturned = 'px-9 px-9 text-xl'
   } else {
       throw Error('No data provided for size')
   }
   if(type == 'neutral'){
       typeReturned = 'bg-white border-black  text-black'
   } else if(type == 'danger'){
       typeReturned = 'bg-red-500 border-red  text-white'
   } else if(type == 'success'){
        typeReturned = 'bg-green-500 border-green  text-white'
   } else {
       throw Error('No data provided for type')
   }
   const text:string = `${sizeReturned} ${typeReturned} ${border? 'border' : ''} ${hover? `hover:${hover}` : ''} font-montserrat transition rounded-xl truncate`
   return text
    
  }
    return (
    <button className={checker()}>
        {loading?
        <ImSpinner8 className='animate-spin'/>:
        `${text}`
        }
    </button>
  )
}
