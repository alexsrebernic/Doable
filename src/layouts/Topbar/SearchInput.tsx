import { Icon } from '@iconify/react';
import { AppContext } from '../Container/MainContainer/RootContainer'
import { useContext, useState } from 'react';
import { useSpring, animated } from '@react-spring/web'

export const SearchInput = ({value,func} : {value:string,func: Function}) => {
  const [showSearchInput, collapseSearchInput] = useState(false)
  const [springs, api] = useSpring(() => ({
    from: { width: 0 },
  }))
  const handleClick = () => {
    api.start({
      from: {
        width: 0,
      },
      to: {
        width: 230,
      },
      reset: showSearchInput,
      reverse: showSearchInput
    })
  }
  return (
    <div >
        <animated.div style={{...springs}}  className={`${showSearchInput? 'absolute bg-white top-3  w-3/4 md:w-1/2  border  ': ''} md:hidden  rounded-lg  whitespace-nowrap  `}>
            <Icon onClick={() => {
                collapseSearchInput(oldVal => !oldVal)
                handleClick()
                func("")
                }} className='inline-block' icon="material-symbols:search" color="8a8a8a" width={30} />
            <div className={` ${showSearchInput?'inline-block':'hidden  '} w-full inline-block items-center justify-between `}>
                <input value={value}  onChange={(e) => func(e.target.value)}  className={` ${showSearchInput?'block':'hidden'} focus:outline-none   inline-block  placeholder:text-[#8a8a8a]  w-3/4  sm:w-5/6 h-full`} type="text" placeholder='Search task' />
                    {
                    value.length > 0 &&
                    <Icon className='inline-block cursor-pointer' icon="ph:x" color="8a8a8a" width={20} onClick={() => func("")}/>
                    }
            </div>
        </animated.div>
        <div   className={` bg-white  w-full  2xl:w-[30em]   border  hidden  md:space-x-3 md:py-1 md:px-3 md:static md:flex md:border-b rounded-lg  whitespace-nowrap  `}>
            <Icon className='inline-block' icon="material-symbols:search" color="8a8a8a" width={30} />
            <div className={` w-full inline-flex items-center justify-between `}>
                <input value={value}  onChange={(e) => func(e.target.value)}  className={`  focus:outline-none   inline-block  placeholder:text-[#8a8a8a]  w-3/4   h-full`} type="text" placeholder='Search task' />
                    {
                    value.length > 0 &&
                    <Icon className='inline-block cursor-pointer' icon="ph:x" color="8a8a8a" width={20} onClick={() => func("")}/>
                    }
            </div>
        </div>
    </div>
   
  )
}
