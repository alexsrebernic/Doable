import Task from "./Task"

export type Tag = {
    fullPath: String,
    name: String,
    icon: String,
    id: String,
    theme?: String,
    sortable?: Boolean,
    suggestions?: Boolean,
    share?: Boolean,
    canAddTask?:Boolean,
    tasks?: Task[]
}