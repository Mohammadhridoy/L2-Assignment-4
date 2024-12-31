import { model, Schema } from "mongoose";
import { Iblog } from "./blog.interface";



const blogSchema = new Schema<Iblog>({
    title:{
        type:String,
        required: true
    },
    content:{
        type:String
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'author'
    },
    isPublished:{
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
)


export const Blog = model<Iblog>("Blog", blogSchema)