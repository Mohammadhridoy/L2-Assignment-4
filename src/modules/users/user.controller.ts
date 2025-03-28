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

    const {refreshToken, accessToken} = result

    res.cookie("refreshToken", refreshToken)
    
sendResponse(res, {
    statusCode: StatusCodes.OK,
    status:true,
    message: "Login successful",
    data: {
        accessToken: accessToken
    }
})

})


const allUsers = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.getAllUserFrom()

    sendResponse(res,{
        statusCode: StatusCodes.OK,
        status:true,
        message:"All users retrieved successfully",
        data: result
    })
})


const getSingleUser = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.getSingleUserFromBd(req.params.email)

    sendResponse(res,{
        statusCode:StatusCodes.OK,
        status:true,
        message:"One user retrived successfully",
        data:result
    })
})





export const userController = {
    register,
    login,
    allUsers,
    getSingleUser
}