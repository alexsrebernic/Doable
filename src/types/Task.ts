type Task = {
    owner: string,
    text: string,
    createdAt: Date,
    favorite: Boolean,
    dueDate?: Date
}
export default Task