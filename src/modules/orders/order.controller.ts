import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { orderService } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";




const createOrder = async (req: Request, res: Response) =>{
    try{
        const orderData = req.body 
        
        const zodValidationData = orderValidationSchema.parse(orderData)
        const result = await orderService.createOrderIntoDB(zodValidationData, req.ip as string)

        
        res.status(200).json({
            message:"Order created successfully",
            status:true,
            data: result,
        })

    }catch(err:any){
        res.status(500).json({
            success: false, 
            message: err.message || 'something went wrong',
            error: err, 
        })

    }
}

const getOrderRevenue = async (req: Request, res: Response) =>{
    try{
        const result = await orderService.getOrderRevenueFromDB()

        res.status(200).json({
            message:"Revenue calculated successfully",
            status:true,
            data: {
                totalRevenue: result
            } 
        })

    }catch(err:any){
        res.status(500).json({
            success: false, 
            message: err.message || 'something went wrong',
            error: err, 
        })
    }
}

// verifypayment 
const verifyPayment = catchAsync(async(req, res)=>{
    const order = await orderService.verifyPayment(req.query.order_id as string)

    sendResponse(res, {
        statusCode:StatusCodes.CREATED,
        message:"Order verified successfully",
        data: order,
    })

})


// get All order info........
const getAllOrder = catchAsync(async(req, res)=>{
    const allOrderData = await orderService.getAllOrderDatafromBD()

    sendResponse(res, {
        statusCode:StatusCodes.CREATED,
        message:"Order verified successfully",
        data: allOrderData ,
    })

})


export const orderControllers ={
    createOrder,
    getOrderRevenue,
    verifyPayment,
    getAllOrder
}