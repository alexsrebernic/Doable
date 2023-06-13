import { userId } from "./UserId"
export interface User {
    id: userId,
    email: string,
    createdAt?: Date
}