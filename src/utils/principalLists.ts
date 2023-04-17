import { List } from "../types/List";
import {BsSun,BsStar,BsCalendar,BsCheckCircle,BsHouseCheck, BsListUl} from 'react-icons/bs'

export const principalListsUtils : List[] = [
    {
      title:"My day",
      color:"orange",
      Icon:BsSun
    },
    {
      title:"Important",
      color:"pink",
      Icon: BsStar
    },
    {
      title:"Planned",
      color:"lightblue",
      Icon: BsCalendar,
    },
    {
      title:"Completed",
      color:"green",
      Icon: BsCheckCircle
    },
    {
      title:"Tasks",
      color:"purple",
      Icon: BsHouseCheck
    }, 
  ]