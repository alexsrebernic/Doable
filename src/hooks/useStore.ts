import { useEffect, useState } from "react";
import { Tag } from "../types/Tag/Tag";
import { User } from "../types/User";
import fetchMocksTags from "../helper/fetchMockTags";
import { TagId } from "../types/Tag/TagId";
interface Store {
    tags : Tag[] | null,
    user : User | null,
    setTags: Function,
    setUser: Function,
    setActualUser:Function,
    setTag : Function,
    removeTag:Function,
    setTask: Function,
    removeTask: Function,
}
export default function useStore() : Store{
  const [tags,setTags] = useState<Tag[] | null>(null)
  const [user,setUser] = useState(null)
    function cloneTag(tag : Tag){
        return window.structuredClone(tag)
    }
    function setTag(){

    }
    function removeTag(){
    }
    function setActualUser(){
        
    }
    function removeUser(){
        
    }
    function setTask(){
        
    }
    return {
      tags,
      user,
      setTags,
      setActualUser,
      "setTag": (tag : Tag) => {}
  }
}