import React from 'react'
import { List } from '../../types/List'
import { ListsContainer } from './Lists/ListsContainer'
import useLists from './hooks/useLists'
export const Lists =  () => {
  const [principalCategories, userCategories] = useLists()
  return (
    <div className='col-span-12 '>
      <div>
        <h1 className='font-semibold text-3xl '>Your lists:</h1>
      </div>
      {
        principalCategories &&
        userCategories ? 
        <ListsContainer principalCategories={principalCategories} userCategories={userCategories}/> : 
        <>
         <h1>Loading...</h1>
        </>

      }
    </div>
  )
}
