import { Tag } from "../types/Tag/Tag"

const FavoriteTags : Tag[] = [
    {
        name: "My day",
        id:"myday",
        icon: "ph:sun-fill",
        theme:"#225FFC"

    },
    {
        name: "Important",
        icon:"fluent:important-12-filled",
        id:"important",
        theme:"#225FFC"

    },
    {
        name:'Completed',
        id:"completed",
        icon:"fluent-mdl2:completed-solid",
        theme:"#225FFC"

    },
    {
        id:"mytasks",
        name:'My Tasks',
        icon:"fa-solid:tasks",
        theme:"#225FFC"

    },
    {
        id:"all",
        name:'All',
        icon:"fluent:grid-28-filled",
        theme:"#225FFC"

    },
    {
        id:"search",
        name:'Search',
        icon:"",
        theme:"#225FFC"
    },
]
export const favoriteTagsIds = FavoriteTags.map((o) => {
    return o.id
})
export default FavoriteTags