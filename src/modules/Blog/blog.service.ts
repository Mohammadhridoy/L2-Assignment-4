
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { Iblog } from "./blog.interface";
import { Blog } from "./blog.model";


// creae blog and populate data 
const createBlogIntoDB = async (payload:Iblog) =>{

    const author = payload?.author

    if(!author){
        throw new AppError(StatusCodes.NOT_FOUND, 'Give author referce id')
    }

    const blogCreated = await Blog.create( payload )

    const {id} = blogCreated

    const result = await Blog.findById(id).populate("author");
   

    return result
} 

// update data into database and populate data 
const updateBlogfromDB = async (id:string, payload:Partial<Iblog>) =>{

    

    const result = await Blog.findByIdAndUpdate(id, payload).populate('author')
    
   

    return result


}

//  delete blog into database 
const deleteBlogIntoDB = async(id:string) =>{

    const result = await Blog.findByIdAndDelete(id)
    return result
}

// get all blogs from database
const getAllBlogsfromDB = async(query: Record<string, unknown>) =>{

    const queryObj = {...query} 

     // search element ... 
    let searchText = ' '
    if(query?.search){
        searchText= query?.search as string
    }
    
    
    const searchElement = ['title', 'content']

    const searchQuery = Blog.find({
        $or: searchElement.map((field)=>({
            [field]:{$regex: searchText, $options:"i"}
        })
            
        )
    }) 


    // ** filtering ***
   // object copy 

    const  excludeFields = ['search', 'sortBy', 'sortOrder']
    excludeFields.forEach(el=> delete queryObj[el]) 
        
    const authorId = queryObj.filter
        const filterQuery =  searchQuery.find({author: authorId}).populate('author')

    // sorting implementation 
    const sortBy = (query?.sortBy as string) || 'createdAt'
    const sortOrder = query?.sortOrder === 'asc'? 1: -1

    const sortQuery = await filterQuery.sort({[sortBy]:sortOrder})

    return sortQuery
}



export const blogServices = {
    createBlogIntoDB, 
    updateBlogfromDB,
    deleteBlogIntoDB,
    getAllBlogsfromDB
}