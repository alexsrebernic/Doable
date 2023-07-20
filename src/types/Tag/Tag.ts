export interface Tag {
    name: string,
    icon?: string |  null,
    readonly id: string | 'completed' | 'important'| 'myday'|'mytasks'|'all',
    numberOfTasks?: number,
    tasksIds?: string[],
    ownerId?: string,
    sortBy?: 'importance' | 'dueDate' | 'createdAt' | 'alphabetically' 
    sortOrder? : 'asc' | 'desc',
    createdAt? : Date,
    theme?: string 
}
