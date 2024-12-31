import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";



const register = catchAsync(async(req, res)=>{
    const result = await authService.registerIntoDB(req.body)

    sendResponse(res, {
        statusCode:StatusCodes.CREATED,
        status: true,
        message: "User registered successfully",
        data: result
    })

})




export const authController = {
    register
}