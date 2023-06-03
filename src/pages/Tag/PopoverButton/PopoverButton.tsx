import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react'

interface Props {
  text: String,
  elements: object[],
  icon: String
}
export default function PopoverButton({text,elements,icon} : Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

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
      <button aria-describedby={id}  onClick={handleClick}>
        <Icon icon={icon} width={30} className='hover:text-blue-500 text-[#225FFC] transition' color=''/>
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
              <div className='flex items-center px-2 space-x-3 p-2 hover:bg-gray-200 transition cursor-pointer' key={i}>
                <div>
                  <Icon color="#225FFC" width={23} icon={o.icon}/>
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