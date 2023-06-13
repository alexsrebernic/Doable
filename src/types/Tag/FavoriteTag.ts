import Task from "../Task/Task"
import { Tag } from "./Tag"
export interface FavoriteTag extends Tag{
    fullPath?: String,
    sortable?: Boolean,
    suggestions?: Boolean,
    share?: Boolean,
}