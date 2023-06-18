export interface User {
    id: number,
    email: string,
    tagsId: number[],
    createdAt?: Date
}