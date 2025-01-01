import {  Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogServices } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";



const createBlog = catchAsync(async(req:Request, res: Response) =>{
    

    const result = await blogServices.createBlogIntoDB(req.body)

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        status:true,
        message: "Blog created successfully",
        data: result
    })
})


export const blogController = {
    createBlog
}