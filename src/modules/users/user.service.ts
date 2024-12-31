import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import { StatusCodes} from 'http-status-codes';
import { User } from "./user.model";




const createAdminIntoDB = async (payload:IUser) =>{

    payload.role ='admin'

    const result =  await User.create(payload)
    return result ; 

}

export const userService = {
    createAdminIntoDB
}