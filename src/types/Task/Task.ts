import { Tag } from "../Tag/Tag"

type Task = {
    text: string,
    ownerId: number,
    readonly id: number,
    completed: Boolean,
    createdAt: Date,
    tagId: number
    favorite: Boolean,
    dueDate?: Date,
    repeat? : Boolean,
}
export default Task