import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import favoriteCategories from '../../helper/favoriteTag'
import {  Tag as TagType } from '../../types/Tag'
import { Header } from './Header/Header'
import { AppContext } from '../../layouts/Container/MainContainer/MainContainer'
import { Body } from './Body/Body'
export const Tag = () => {
  const {showToast} = useContext(AppContext)
  const {tag_id} = useParams()
  const [tag,setTag] = useState<TagType | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    if(!tag_id) return navigate('/tasks/myday')
    const favoriteTag = favoriteCategories.find(tag => tag.id == tag_id)
    if(!favoriteTag){ 
      let tag : TagType | null = fetchTag()
      if(!tag) navigate("/tasks/myday")
    } else {
      setTag(favoriteTag)
    }
  })
  function fetchTag(){
    try {
      if(!false){
        throw Error("ERROR 404: Tag doesn´t exists")
      }
      return null
    } catch(err : any){
      showToast(err.message,'error')
      throw Error(err)
    }
    
  }
  return (
    <div className='p-5  2xl:p-10'>
      {tag && 
      <>
        <Header tag={tag}/>
        <Body/>
      </>
      }
    </div>
  )
}
