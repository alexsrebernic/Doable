import Task from "../Task/Task"
import MockTask from "../Task/Mocks/MockTask"
export interface Tag {
    name: String,
    icon?: String,
    id: String,
    numberOfTasks?: number,
    theme?: String,
    tasks?: Task[] | MockTask[]
}