type MockTask = {
    text: string,
    createdAt: Date,
    favorite: Boolean,
    dueDate?: Date,
    repeat? : Boolean,
    completed: Boolean,
}
export default MockTask