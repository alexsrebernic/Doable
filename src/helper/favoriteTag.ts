import { Tag } from "../types/Tag/Tag"

const FavoriteTags : Tag[] = [
    {
        name: "My day",
        id:"myday",
        icon: "ph:sun-fill",
    },
    {
        name: "Important",
        icon:"fluent:important-12-filled",
        id:"important",
    },
    {
        name:'Completed',
        id:"completed",
        icon:"fluent-mdl2:completed-solid",
    },
    {
        id:"mytasks",
        name:'My Tasks',
        icon:"fa-solid:tasks",
    },
    {
        id:"all",
        name:'All',
        icon:"fluent:grid-28-filled",
    }
]
export const favoriteTagsIds = FavoriteTags.map((o) => {
    return o.id
})
export default FavoriteTags