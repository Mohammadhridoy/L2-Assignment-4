import { z } from "zod";
import { ObjectId } from "mongodb";


const orderValidationSchema = z.object({
    email: z.string(),
    // carId: z.instanceof(ObjectId),
    carId:z.string(),
    quantity: z.number(),
    totalPrice:z.number(),
    status:z.enum(["Pending","Paid" ,"Shipped", "Completed", "Cancelled"]).optional(),
    orderStatus:z.enum(["Pending" , "Processing", "Shipped" , "Delivered" ]).optional(),
    deliveryDate:z.string().optional(),
    transaction:z.object({
        id:z.string(),
        transactionStatus:z.string(),
        bank_status:z.string(),
        sp_code:z.string(),
        sp_message:z.string(),
        method:z.string(),
        date_time:z.string(),
    }).optional()
})


export default orderValidationSchema; 