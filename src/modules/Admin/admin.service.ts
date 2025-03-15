
import { User } from "../users/user.model";



const updateUserStatusIntoDB = async(id:string)=>{

    const isBlocked = true; 

    const result = await User.findByIdAndUpdate(id, { isBlocked})

    return result

    
}



export const adminService = {
    updateUserStatusIntoDB,
}