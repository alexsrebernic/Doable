import { Tag } from "../types/Tag"


const FavoriteTags : Tag[] = [
    {
        fullPath:'tasks/myday',
        name: "My day",
        id:"myday",
        icon: "ph:sun-fill",
        sortable: true,
        suggestions: true,
        canAddTask: true,
    },
    {
        fullPath:'tasks/important',
        name: "Important",
        icon:"fluent:important-12-filled",
        id:"important",
        sortable: true,
        suggestions: false,
        canAddTask: true,
    },
    {
        fullPath:'tasks/completed',
        name:'Completed',
        id:"completed",
        icon:"fluent-mdl2:completed-solid",
        sortable: false,
        suggestions: false,
        canAddTask: false,
    },
    {
        fullPath:'tasks/mytasks',
        id:"mytasks",
        name:'My Tasks',
        icon:"fa-solid:tasks",
        sortable: true,
        suggestions: true,
        canAddTask: true,
    },
    {
        fullPath:'tasks/all',
        id:"all",
        name:'All',
        icon:"fluent:grid-28-filled",
        sortable: true,
        suggestions: false,
        canAddTask: true,
    }
]
export default FavoriteTags