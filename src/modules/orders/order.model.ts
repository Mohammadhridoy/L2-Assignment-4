import mongoose, { model, Schema } from "mongoose";
import { Order } from "./order.interface";




const orderSchema = new Schema<Order>({
    email:{type: String, required:[true, 'email is required']},
    // carId:{type: mongoose.Schema.Types.ObjectId, ref:"Car", required:[true, 'car id is required']},
    carId:{type:String,required:[true, 'car id is required'] },
    quantity:{type:Number, required:true},
    totalPrice:{type:Number, required:[true, 'please give a totalPrice']},
    status:{
        type:String,
        enum:["pending", "paid", "Shipped", "Completed", "Cancelled"],
        default:"pending"
    },
    transaction:{
        id:{type:String},
        transactionStatus:{type:String},
        bank_status:{type:String},
        sp_code:{type:String},
        sp_message:{type:String},
        method:{type:String},
        date_time:{type:String},
    }
    
}, 
{
    timestamps:true
}

)



export const OrderModel = model<Order>('Order', orderSchema)