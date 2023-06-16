import { useEffect, useState } from "react";
import { Tag } from "../types/Tag/Tag";
import { User } from "../types/User";
import fetchMocksTags from "../helper/fetchMockTags";
import { TagId } from "../types/Tag/TagId";
interface ReturnObject {
    tags : Tag[] | null,
    user : User | null,
    setTags: Function,
    setUser: Function,
    setTag : Function,
}
export default function useInitializeApp() : ReturnObject{
  const [tags,setTags] = useState<Tag[] | null>(null)
  const [user,setUser] = useState(null)
 useEffect( () => {
     (async () => {
        let tags = import.meta.env.MODE == "development"? await fetchMocksTags() : null   
        setTags(tags)
     })()
 },[])
  return {
      tags,
      user,
  }
}