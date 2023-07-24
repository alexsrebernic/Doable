import { Tag } from "../Tag/Tag"

type Task = {
    text: string,
    ownerId: string,
    readonly id: string,
    completed: Boolean,
    completedAt: Date | null,
    createdAt: number,
    myDay: boolean ,
    myDayDate: number | null,
    tagId: string,
    important: Boolean,
    dueDate: number | null,
    repeat : string | null,
    taskSuccessorId?: string
}
export default Task