import { TagId } from "../Tag/TagId"
import { User } from "./User"

type Task = {
    owner: User,
    text: string,
    tagId: TagId,
    completed: Boolean,
    createdAt: Date,
    favorite: Boolean,
    dueDate?: Date,
    repeat? : Boolean,
}
export default Task