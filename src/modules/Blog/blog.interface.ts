import { Types } from "mongoose";



export interface Iblog {
    title: string,
    content:string,
    author: Types.ObjectId,
    isPublished: boolean
}

