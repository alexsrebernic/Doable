export interface User {
    id: string,
    email: string,
    tagsIds: string[],
    createdAt?: Date
}