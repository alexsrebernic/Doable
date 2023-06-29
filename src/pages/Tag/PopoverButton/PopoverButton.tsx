import React, { SVGProps } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react'

interface Props {
  text: String,
  elements: object[],
  icon: String,
  color?:String,
  size?: Number
  value?: string 
}
export default function PopoverButton({text,elements,icon,color,size,value} : Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  function handleFunction(func,args){
    console.log(func,args)
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
    <div>
      <button className={`${value && 'border-[#225FFC] space-x-2 flex items-center rounded  border border-solid'} p-1 transition` }  aria-describedby={id}  onClick={handleClick}>
        <Icon icon={icon} width={size?size:30} className={color?`text-[${color}]`:'hover:text-blue-500 text-[#225FFC] transition'} color=''/>
        {
          
          value && <span className='text-[#225FFC] text-sm font-medium'>{value}</span>
        }
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className='border-b text-center font-semibold py-2 '>
          {text}
        </div>
        {
          elements.map((o,i) => {
            return (
              <div onClick={() => handleFunction(o.func,o.arg)} className={`${o.hasOwnProperty('component')  && 'border-t border-1 border-solid ' } flex items-center px-2 space-x-3 p-2 hover:bg-gray-200 transition cursor-pointer`} key={i}>
                <div>
                  {
                    o.icon?
                    <Icon color="#225FFC" width={23} icon={o.icon}/>:
                    <img className='fill-[#225FFC]' src={o.svgElement} alt="" />
                  }
                </div>
                <span>
                  {o.text}
                </span>
              </div>
            )
          })
        }
      </Popover>
    </div>
  );
}