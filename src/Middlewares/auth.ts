import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../error/AppError"
import { StatusCodes } from "http-status-codes"
import jwt, { JwtPayload } from 'jsonwebtoken' 
import config from "../config"
import { TUserRole } from "../modules/users/user.interface"
import { User } from "../modules/users/user.model"
import verifyToken from "../utils/jwtVerifyToken"


const auth = (...requiredRoles: TUserRole[]) =>{
     return catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
            const token = req.headers.authorization
          
          

            if(!token){
                throw new AppError(StatusCodes.UNAUTHORIZED, "you are not authorized!")
            }
           

          
            
             const decoded = verifyToken(token, config.jwt_access_secret as string) as JwtPayload
            
           
           
            const {email, role} = decoded; 

            const user = await User.findOne({email})

            
       
          

            if(!user){
                throw new AppError(StatusCodes.NOT_FOUND, "This user is not found")
            }
            
            const userStatus = user.isBlocked
            if(userStatus==true){
                throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked')
            }

           

            if(requiredRoles && !requiredRoles.includes(role)){
                throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized')
            }

            req.user = decoded as JwtPayload

            next()


     })
}

export default auth; 