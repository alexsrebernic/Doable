import React from 'react'
import personalizedSVG from '../../../../assets/selectdate.svg'
import { useRef } from 'react';
export const CustomInputDueDate = ({setValue}) => {
    const input = useRef(null);
    function handleClick() {
        input.current.focus();
        input.current.showPicker();
    }
    function handleChange(){
        const value = input.current.value
        console.log(value)
        setValue(value)
    }
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        if (month < 10) {
          month = "0" + month;
        }
    
        if (day < 10) {
          day = "0" + day;
        }
    
        return `${year}-${month}-${day}`;
      }
  return (
      <>
        <div onClick={handleClick} className={`flex items-center px-2 space-x-3 p-2 hover:bg-gray-200 transition cursor-pointer w-full`} htmlFor="input-id">
            <div>
                <img className='fill-[#225FFC]' src={personalizedSVG} alt="" />
            </div>
            <span>
            Personalized
            </span>
        </div>      
        <input ref={input} style={{
            width: '0px',
            height: '0px'
        }} className='absolute pointer-events-none clip' id='input-id' type='date'   
        min={getCurrentDate()}
        onChange={handleChange}
        />
      </>
   
  )
}
