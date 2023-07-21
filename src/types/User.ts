export interface User {
    id: string,
    email: string | null,
    tagsIds: string[],
    createdAt?: number,
}