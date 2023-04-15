import React from 'react'
import {ImSpinner8} from 'react-icons/im'

interface Props {
    size?: string, 
    type?: string, 
    text?: string, 
    hover?:string,
    aStyle?: string,
    loading?:Boolean, 
    border?: Boolean, 
    shadow?: Boolean,
    func?: Function | Promise<any>,
}
export const Button = (
    {size = 'sm', 
    type = 'neutral', 
    text = 'Ok', 
    hover,
    aStyle = '',
    loading = false, 
    border = true, 
    shadow = false,
    func,
} : Props
) => {
    function triggerFunction () {
        if(func instanceof Promise){
            func.then((data) => {
                if(data) checker(true)
            }).catch((error:Error) => {
                if(error) checker(false)
            })
        } else if (func instanceof Function) {
            try {
                func()
                checker(true)
            } catch (e){
                checker(false)
            }
        }
        return
    }
    const successStyle = "bg-green-500 border-green  text-white"
    const errorStyle =  "bg-red-500 border-red  text-white"
    const checker : (success : Boolean | null) => string = (success: Boolean | null) : string => {
    let sizeReturned: string;
    let typeReturned: string;
    if(size == 'sm'){
        sizeReturned = 'px-5 py-3 text-sm'
    } else if (size == 'md'){
        sizeReturned = 'px-6 py-3 text-md'
    } else if (size == 'lg'){
        sizeReturned = 'px-7 px-4 text-lg'
    } else if(size == 'xl'){
        sizeReturned = 'px-9 px-4 text-xl'
    } else {
        throw Error('No data provided for size')
    }
    if(type == 'neutral'){
        typeReturned = 'bg-white border-black  text-black'
    } else if(type == 'danger'){
        typeReturned = errorStyle
    } else if(type == 'success'){
            typeReturned = successStyle
    } else if(type == "reverse"){
            typeReturned = 'bg-black   text-white'
    } else if(type == 'blank') {
            typeReturned = ""
    } else {
        throw Error('No data provided for type')
    }
   const text:string = ` ${aStyle} ${sizeReturned} ${typeReturned} ${border? 'border' : ''} ${shadow?'shadow-md': ''} ${hover?hover: ''}   font-montserrat transition rounded-xl truncate`
   return text
    
  }
    return (
    <button onClick={triggerFunction} className={checker(null)}>
        {loading?
        <ImSpinner8 className='animate-spin'/>:
        `${text}`
        }
    </button>
  )
}
