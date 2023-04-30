import React from 'react'
import { List } from '../../../types/List'
import { ListItem } from './ListItem'
import {AiOutlineGroup} from 'react-icons/ai'
export const ListsContainer = ({principalCategories, userCategories} : {principalCategories: List[], userCategories: List[]}) => {
  return (
    <div className='py-6  md:grid grid-cols-3'>
        <div className='col-span-1 space-y-1 border-b  md:border-b-0 md:mx-3 pb-3 md:pr-3'>
            {principalCategories.map((o,i) => {
                return (
                    <ListItem {...o} key={i}/>
                )
            })}
        </div>
        <div className='col-span-2 py-3 md:py-0 '>
            <div >
                {userCategories.map((o,i) => {
                    return (
                        <ListItem {...o} key={i}/>
                    )
                })}
            </div>
            <div>
                <div className='flex items-center  justify-between hover:bg-gray-300 rounded-md px-2 transition'>
                    <div className='flex flex-1 items-center space-x-3'>
                        <div className='text-4xl '>
                            +
                        </div>
                        <div className='font-medium'>
                            New list
                        </div>
                    </div>
                    <div>
                        <AiOutlineGroup/>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
  )
}
