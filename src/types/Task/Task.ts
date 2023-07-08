import { Tag } from "../Tag/Tag"

type Task = {
    text: string,
    ownerId: string,
    readonly id: string,
    completed: Boolean,
    createdAt: Date,
    tagId: string,
    important: Boolean,
    dueDate: Date | null,
    repeat : string | null,
}
export default Task