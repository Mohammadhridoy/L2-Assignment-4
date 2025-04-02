import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import { StatusCodes} from 'http-status-codes';
import { User } from "./user.model";
import bcrypt from "bcrypt"
import createToken from "../../utils/auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";



const registerIntoDB = async(payload:IUser) =>{
    const result = await User.create(payload)

    return result
}


type Tpayload ={
    email:string, 
    password:string
}

const loginIntoDB = async(payload:Tpayload)=>{
    const userEmail = payload.email
    const user = await User.findOne({email: userEmail}).select("+password")

    // if user is not found
    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND, "This user is not found")
    }

    // if user is blocked 
    const isBlocked = user?.isBlocked
    if(isBlocked){
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!')
    }

    // checking if the password is correct
    const isPasswordMatched = await bcrypt.compare(
        payload?.password,
        user?.password
    )
    if(!isPasswordMatched){
        throw new AppError(StatusCodes.FORBIDDEN, 'Give correct password !')
    }

    // create token and sent to the client 
    const jwtpayload = {
        email: user?.email,
        role: user?.role
    }


    const  accessToken = createToken(jwtpayload, 
        config.jwt_access_secret as string,
          config.jwt_access_expires_in as string
    )

    const refreshToken = createToken(jwtpayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string)



    return {
        accessToken,
        refreshToken
    } 

   


}


const getAllUserFrom = async() =>{
    const allUsers = await User.find({role:{$ne:"admin"}}) 
    return allUsers
}


const getSingleUserFromBd = async(email:string) =>{
    const oneUser = await User.findOne({email})

    return oneUser
}

// change password

type TuserPayload = {
    oldpassword:string,
    newPassword: string
}

const changePasswordIntoBd = async(userData:JwtPayload| undefined, payload:TuserPayload)=>{
   

    const user = await User.findOne({ email: userData?.email}).select("+password")

    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND, "This user is not found")
    }

    // if user is blocked 
    const isBlocked = user?.isBlocked
    if(isBlocked){
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!')
    }

    // checking if the password is correct
    const isPasswordMatched = await bcrypt.compare(
        payload?.oldpassword,
        user?.password
    )
    if(!isPasswordMatched){
        throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched!')
    }


    const newHashpassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.bcrypt_salt_round)
    )

    await User.findOneAndUpdate(
        {
            _id:user?._id,
            role: user?.role
        },
        {
            password: newHashpassword,
            needPasswordChange: true,
            passwordChangedAt: new Date()
        }
    )

    return null


    
    
}


// user isblocked
const isblockedfromBD = async(userId:string)=>{

    
    
    const result = await User.findOneAndUpdate({_id:userId},{
        isBlocked:true
    })
    return result

}


export const userService = {
    registerIntoDB,
    loginIntoDB,
    getAllUserFrom,
    getSingleUserFromBd,
    changePasswordIntoBd,
    isblockedfromBD 
}