import { Tag } from "../Tag/Tag"
import { TagId } from "../Tag/TagId"

type Task = {
    text: string,
    tagId: TagId,
    completed: Boolean,
    createdAt: Date,
    fromTag: Tag
    favorite: Boolean,
    dueDate?: Date,
    repeat? : Boolean,
}
export default Task