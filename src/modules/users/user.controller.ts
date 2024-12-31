import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";



const createAdmin = catchAsync(async(req, res)=>{
        const result = await userService.createAdminIntoDB(req.body)

        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'Admin created successfully',
            data: result
        })
})




export const userController = {
    createAdmin
}