export interface User {
    id: string,
    email: string,
    tagsId: string[],
    createdAt?: Date
}