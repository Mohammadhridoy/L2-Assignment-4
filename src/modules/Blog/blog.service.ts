import { Iblog } from "./blog.interface";
import { Blog } from "./blog.model";



const createBlogIntoDB = async (payload:Iblog) =>{
    const result = await Blog.create(payload)
    return result
} 



export const blogServices = {
    createBlogIntoDB
}