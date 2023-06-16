import { Tag } from "../types/Tag/Tag"
import Task from "../types/Task/Task"
import FavoriteTags from "./favoriteTag"
export default async function fetchMocksTags() : Promise<Tag[]>{
    const mockTagsWithTasks =  [
        {
            name: "My day",
            id:"myday",
            tasks: [
                {
                    text: "Do laundry",
                    createdAt: new Date(),
                    favorite: false,
                    completed: true,
                },
                {
                    text: "Wash the floor",
                    createdAt: new Date(),
                    favorite: false,
                    completed: false,
                },
                {
                    text: "Make the bed",
                    createdAt: new Date(),
                    favorite: false,
                    completed: false,
                },
                {
                    text: "Wash teeths",
                    createdAt: new Date(),
                    favorite: false,
                    completed: false,
                }
            ]
        },
        {
            name: "Important",
            id:"important",
            tasks: [
                {
                    text: "Work",
                    createdAt: new Date(),
                    favorite: true,
                    completed: false,

                },
                {
                    text: "Go pay rent",
                    createdAt: new Date(),
                    favorite: true,
                    completed: false,

                },
            ]
        },
        {
            name:'Completed',
            id:"completed",
        },
        {
            id:"mytasks",
            name:'My Tasks',
            tasks: [
                {
                    text: "Work",
                    createdAt: new Date(),
                    favorite: true,
                    completed: false,

                },
                {
                    text: "Go pay rent",
                    createdAt: new Date(),
                    favorite: true,
                    completed: false,

                },
            ]
        },
        {
            id:"all",
            name:'All',
        },
        {
            id:"12345",
            name:'Gym',
            tasks: [
                {
                    text: "Make triceps",
                    createdAt: new Date(),
                    favorite: false,
                    completed: false,

                },
                {
                    text: "Do chest",
                    createdAt: new Date(),
                    favorite: false,
                    completed: false,

                },
            ]
        }
    ]
    mockTagsWithTasks.forEach((o,i) => {
        if(!FavoriteTags[i]) return FavoriteTags.push(o)
        if(FavoriteTags[i].id == o.id){
            FavoriteTags[i].tasks = mockTagsWithTasks[i].tasks
        }
    })
    return FavoriteTags
};