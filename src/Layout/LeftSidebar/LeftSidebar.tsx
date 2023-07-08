import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';
import { Icon } from '@iconify/react';
import FavoriteTags , {favoriteTagsIds} from '../../helper/favoriteTag.js'
import { Tag } from '../../types/Tag/Tag';
import { ButtonNav } from './ButtonNav';
import { useSpring, animated } from '@react-spring/web'
import { useDispatch, useSelector } from 'react-redux';
selectNonFavoriteTags
import { addTag, selectNonFavoriteTags } from '../../store/slices/tagsSlice';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import uniqid from 'uniqid'
import { TagList } from './TagList';
export const LeftSidebar = ({springs}) => {
  const dispatch = useDispatch()
  const {sidebar,user, showToast} = useContext(AppContext)

  const [inputTagName, setInputTagName] = useState('')
  const input = useRef(null)

 
  const navigate = useNavigate()
  const nonFavoriteTags = useSelector(selectNonFavoriteTags)

  function handleAddTag(){
  if(inputTagName.length == 0) return 
   const id =  uniqid()
   dispatch(addTag({id,userId: user.id,tagName: inputTagName}))
   navigate(`tasks/${id}`)
   sidebar.func()
   setInputTagName('')
   input.current.blur()
  }

  const sortTagsByUserOrder = () => {
    if(!user.hasOwnProperty("tagsIds") ) return []
    if(user.tagsIds.length == 0 ) return []
    const sortedTags = []
    for (const tagId of user.tagsIds) {
      const tag = nonFavoriteTags.find((t) => t.id === tagId);
      if (tag) {
        sortedTags.push(tag);
      }
    }
    return sortedTags;
  };

  const phoneClasses =  'fixed  top-0   w-screen  bg-black/[.4]' 
  const desktopClasses = 'lg:w-full lg:static lg:bg-transparent lg:block lg:border-r lg:col-span-4 xl:col-span-3 2xl:col-span-3'

  return (
      <div onClick={(e) =>{
        e.stopPropagation()
        sidebar.func()}
        }  className={`${sidebar.state? phoneClasses : 'hidden'} ${desktopClasses} top-0   lg:static  h-screen lg:h-[95vh]  z-10 `}>
          <animated.div style={{ ...springs}} onClick={(e) =>{
            e.stopPropagation()
            }}
            className=' bg-white w-4/5 md:w-1/2 lg:w-full border-r lg:border-none h-full   '>
            <div className='h-full flex flex-col overflow-y-auto pb-3 lg:pb-8'>
              <div className='py-4 px-4 flex lg:hidden border-b justify-between  space-x-3'>
                <div className='flex items-center'>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.9997 36.6667C21.333 36.6667 22.6663 36.5 23.833 36.1667C23.1663 35.3334 22.4997 34.3334 22.1663 33.1667C21.4997 33.3334 20.6663 33.3334 19.9997 33.3334C12.6663 33.3334 6.66634 27.3334 6.66634 20C6.66634 12.6667 12.6663 6.66671 19.9997 6.66671C21.333 6.66671 22.4997 6.83337 23.6663 7.16671L26.333 4.50004C24.333 3.83337 22.1663 3.33337 19.9997 3.33337C10.833 3.33337 3.33301 10.8334 3.33301 20C3.33301 29.1667 10.833 36.6667 19.9997 36.6667ZM10.833 19.1667L13.1663 16.8334L18.333 22L32.6663 7.66671L34.9997 10L18.333 26.6667L10.833 19.1667ZM31.6663 23.3334L29.5663 27.9167L24.9997 30L29.5663 32.1L31.6663 36.6667L33.7497 32.1L38.333 30L33.7497 27.9167L31.6663 23.3334Z" fill="black"/>
                    </svg>
                    <h1 className='text-3xl font-bold'>Doable</h1>
                </div>
                  <div onClick={sidebar.func}>
                    <Icon icon="mdi:menu-close" width={40}/>
                  </div>
              </div>
              <div className='px-4  pt-4 flex flex-col  overflow-hidden'>
                <div className='space-y-3 max-h-full flex flex-col overflow-y-auto'>
                  <button style={{
                    "boxShadow":" 0px 0px 4px #225FFC"
                  }} className='bg-[#225FFC] flex items-center justify-center space-x-3 py-2.5 shadow-md shadow-[#225FFC] w-full rounded-xl'>
                    <Icon icon="ic:baseline-plus" color="white" width={24} />
                    <span className='font-semibold text-white'>
                      Create New Task
                    </span>
                  </button>
                  <div >
                      <ButtonNav notFavorite={false} func={sidebar.func} text='Stats' icon='gridicons:stats' fullPath='/stats'  number={0}/>
                  </div>
                  <div className='space-y-2 '>
                    <span className='text-[#8a8a8a] font-semibold'>Favorites</span>
                    <div className=''>
                      {
                           FavoriteTags.map((o : Tag, index : number) => {
                            return (
                              <ButtonNav notFavorite={false} func={sidebar.func} text={o.name} icon={o.icon} fullPath={`tasks/${o.id}`}  number={0} key={index}/>
                              )
                            })
                      }
                    </div>
                  </div>
                  <span className='text-[#8a8a8a]  font-semibold'>Your tags</span>
                  <div className=' space-y-2   max-h-full lg:overflow-y-auto'>
                    <div className='overflow-y-auto  '>
                      {
                        user && <TagList user={user} tags={sortTagsByUserOrder()} func={sidebar.func}/>
                    }
                    </div>
                     
                  </div>
                </div>
              </div>
                <div  className='flex space-x-3 py-2 px-8 items-center cursor-pointer  rounded-xl transition'>
                        <Icon onClick={handleAddTag} icon="ic:baseline-plus" className='text-[#225FFC]'  width={30} />
                        <input 
                        value={inputTagName} 
                        onChange={(e) => setInputTagName(e.target.value)} 
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag()} ref={input} type="text" placeholder='New Tag' className='text-black placeholder:text-[#225FFC]  font-medium text-md focus:outline-none w-full' />
                  </div>
            </div>
            
          </animated.div>
      </div>
  
     
  )
}
