import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import { Request, Response } from "express";



const register = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.registerIntoDB(req.body)

    const {_id, name, email } = result 

    sendResponse(res, {
        statusCode:StatusCodes.CREATED,
        status: true,
        message: "User registered successfully",
        data: {
            _id,
            name, 
            email
        }
    })

})


const login = catchAsync(async (req: Request, res:Response)=>{
   
    const result = await userService.loginIntoDB(req.body)

    
sendResponse(res, {
    statusCode: StatusCodes.OK,
    status:true,
    message: "Login successful",
    data: {
        token: result
    }
})

})





export const userController = {
    register,
    login
}