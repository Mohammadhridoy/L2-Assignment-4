import { Blog } from "../Blog/blog.model";
import { User } from "../users/user.model";



const updateUserStatusIntoDB = async(id:string)=>{

    const isBlocked = true; 

    const result = await User.findByIdAndUpdate(id, { isBlocked})

    return result

    
}

const deleteBlogAdminfromDB = async(id:string) =>{

    const result = await Blog.findByIdAndDelete(id)

    return result 
}


export const adminService = {
    updateUserStatusIntoDB,
    deleteBlogAdminfromDB
}