import { useState, useEffect } from "react";
import { List } from '../../../types/List'
import { principalListsUtils } from "../../../utils/principalLists";
import { BsListUl } from "react-icons/bs";
export default function useLists(){
    const [principalLists , setPrincipalLists] = useState<Array<List>  | null>(null);
    const [userLists, setUserLists] = useState<Array<List>  | null>(null);
    useEffect(() => {
        setPrincipalLists(principalListsUtils)
        setUserLists([{
            title: "Garden",
            color: "green",
            Icon: BsListUl
        }])
        console.log(principalLists, userLists)
    },[])
    return [principalLists,userLists]
}