import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Container/RootContainer/RootContainer'
import { Icon } from '@iconify/react';
import FavoriteTags , {favoriteTagsIds} from '../../helper/favoriteTag.js'
import { Tag } from '../../types/Tag/Tag';
import { ButtonNav } from './ButtonNav';
import { useSpring, animated } from '@react-spring/web'
import { useSelector } from 'react-redux';
import { selectNonFavoriteTags } from '../../store';

export const LeftSidebar = ({springs}) => {
  const {sidebar,tags} = useContext(AppContext)
  const phoneClasses =  'absolute  top-0   w-screen  bg-black/[.4]' 
  const desktopClasses = 'lg:w-full lg:static lg:bg-transparent lg:block lg:border-r lg:col-span-4 xl:col-span-3 2xl:col-span-3'
  const nonFavoriteTags = useSelector(selectNonFavoriteTags)
  return (
      <div onClick={(e) =>{
        e.stopPropagation()
        sidebar.func()}
        }  className={`${sidebar.state? phoneClasses : 'hidden'} ${desktopClasses}  h-screen z-10`}>
          <animated.div style={{ ...springs}} onClick={(e) =>{
            e.stopPropagation()
            }}
            className=' bg-white w-4/5 md:w-1/2 lg:w-full border-r lg:border-none h-full'>
            <div>
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
              <div className='px-4 py-4'>
                <div className='space-y-3'>
                  <button style={{
                    "boxShadow":" 0px 0px 4px #225FFC"
                  }} className='bg-[#225FFC] flex items-center justify-center space-x-3 py-2.5 shadow-md shadow-[#225FFC] w-full rounded-xl'>
                    <Icon icon="ic:baseline-plus" color="white" width={24} />
                    <span className='font-semibold text-white'>
                      Create New Task
                    </span>
                  </button>
                 
                  <div >
                      <ButtonNav func={sidebar.func} text='Stats' icon='gridicons:stats' fullPath='/stats'  number={0}/>
                  </div>
                  <div className='space-y-2'>
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
                  <div className='py-1 space-y-2'>
                    <span className='text-[#8a8a8a]  font-semibold'>Your tags</span>
                    <div>
                      { 
                        nonFavoriteTags &&
                        nonFavoriteTags.map((o : Tag, index : number) => {
                          return <ButtonNav notFavorite={true} func={sidebar.func} text={o.name} icon={o.icon} fullPath={`tasks/${o.id}`}  number={0} key={index}/>
                        })
                      }
                    </div>
                      <div className='flex space-x-3 py-2 px-4 items-center cursor-pointer hover:bg-gray-200 rounded-xl transition'>
                        <Icon icon="ic:baseline-plus" className='text-[#8a8a8a]'  width={30} />
                        <span className='text-[#8a8a8a] font-semibold text-md'>New tag</span>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>
      </div>
  
     
  )
}
