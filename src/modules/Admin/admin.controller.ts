import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";



const updateUserStatusByAdmin = catchAsync(async(req:Request, res: Response)=>{
    const id = req.params.userId
    console.log(id)
    const result = await adminService.updateUserStatusIntoDB(id)

    sendResponse(res, {
        statusCode:StatusCodes.OK,
        status:true,
        message: "User blocked successfully"
    })

})


const deleteBlogByAdmin = catchAsync(async(req:Request, res:Response)=>{
        const id = req.params.id
        
        const result = await adminService.deleteBlogAdminfromDB(id)

        sendResponse(res, {
            statusCode:StatusCodes.OK,
            status:true ,
            message:"Blog deleted successfully"
        })

})



export const  adminController = {
    updateUserStatusByAdmin,
    deleteBlogByAdmin
}