
import { Iblog } from "./blog.interface";
import { Blog } from "./blog.model";



const createBlogIntoDB = async (payload:Iblog) =>{

    const blogCreated = await Blog.create( payload )

    const {id} = blogCreated

    console.log( id)

    const result = await Blog.findById(id).populate("author");
    console.log(result)


    return result
} 



export const blogServices = {
    createBlogIntoDB
}