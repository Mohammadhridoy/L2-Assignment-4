import { model, Schema } from "mongoose";
import { Order } from "./order.interface";




const orderSchema = new Schema<Order>({
    email:{type: String, required:[true, 'email is required']},
    car:{type: String, required:[true, 'car is required']},
    quantity:{type:Number, required:true},
    totalPrice:{type:Number, required:[true, 'please give a totalPrice']}
}, 
{
    timestamps:true
}

)



export const OrderModel = model<Order>('Order', orderSchema)