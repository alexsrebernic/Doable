import React, { ReactNode, SVGProps } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react'
import "react-datepicker/dist/react-datepicker.css";


interface Props {
  text: String,
  elements: object[],
  icon: String,
  color?:String,
  size?: Number,
  value?: string | boolean,
  removeValueFunc?: Function,
  removeText? : string,
  stylesButton: object,
  contentButton: ReactNode,
}
export default function PopoverButton({text,elements,color,value,size,icon,removeValueFunc,removeText,stylesButton,contentButton} : Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  function handleFunction(func,args){
    func(args? args : null)
    handleClose()
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div >
      
      {
        contentButton?
        <button
        style={stylesButton}
        aria-describedby={id}  onClick={handleClick}
        >
          {contentButton}
        </button>
        :
        <button style={{
          "border" : typeof value == 'string' && `1px solid ${color}`
        }} className={`${typeof value == 'string' && `space-x-2 flex items-center rounded  border border-solid`} p-1 transition` }  aria-describedby={id}  onClick={handleClick}>
          <Icon icon={icon} width={size?size:30} className={`text-[${color}] fill-[${color}] transition`} color={color}/>
          {
            value && <span style={{color:color}} className={` text-sm font-medium`}>{value}</span>
          }
        </button>
      }
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        style={
          {
            "overflow" : "visible !important"
          }
        }
        className='overflow-visible'
    >
        <div className='border-b text-center font-semibold py-2 '>
          {text}
        </div>
        {
          elements.map((o,i) => {
            return (
              <div key={i}>
                {
                  o.hasOwnProperty('component')? 
                  <>
                   {
                      o.component
                    }
                  </>
                   
                  :
                  <div onClick={() => handleFunction(o.func,o.arg)} className={`flex items-center px-2 space-x-3 p-2 hover:bg-gray-200 transition cursor-pointer`} key={i}>
                    <div>
                      {
                        o.icon?
                        <Icon color={color} width={23} icon={o.icon}/>:
                        <img style={{"fill":color}}  src={o.svgElement} alt="" />
                      }
                    </div>
                    <span>
                      {o.text}
                    </span>
                  </div>
                }
              </div>
     
            )
          })
        }
        {
          value && 
          <div onClick={() => handleFunction(removeValueFunc, null)} className={`flex items-center border-t px-2 space-x-3 p-2 hover:bg-gray-200 transition cursor-pointer`} >
            <div>
              <Icon icon="ph:trash" color='red' width={20}/>
            </div>
            <span className='text-red-600'>
              {removeText}  
            </span>
          </div>
        }
        
      </Popover>
    </div>
  );
}