export interface Tag {
    name: String,
    icon?: String,
    readonly id: number | 'completed' | 'important'| 'myday'|'mytasks'|'all',
    numberOfTasks?: number,
    theme?: String,
    tasksIds?: number[],
    ownerId: number
}
