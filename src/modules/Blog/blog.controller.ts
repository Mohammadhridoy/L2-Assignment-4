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


const updateBlog = catchAsync(async(req:Request, res:Response)=>{
        const blogId = req.params
        

        const result = await blogServices.updateBlogfromDB( blogId.id, req.body)


        sendResponse(res, {
            statusCode:StatusCodes.OK,
            status:true,
            message: 'Blog updated successfully',
            data: result
        })
})


const deleteBlog = catchAsync(async(req:Request, res:Response)=>{
    const id = req.params.id 
    const result = await blogServices.deleteBlogIntoDB(id) 
    
    sendResponse(res , {
        statusCode: StatusCodes.OK,
        status:true,
        message:"Blog deleted successfully"
    })
})

const getAllblogs = catchAsync(async(req:Request, res:Response )=>{
    
    const result = await blogServices.getAllBlogsfromDB(req.query)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        status: true,
        message: "Blogs fetched successfully",
        data: result
    })
})

export const blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllblogs
}