import { Types } from "mongoose"



export type Order ={
    email: string,
    carId: string,
    quantity: number,
    totalPrice:number,
    status?: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled",
    orderStatus?:"Pending" | "Processing"| "Shipped" | "Delivered",
    transaction?:{
        id:string,
        transactionStatus:string, 
        bank_status :string,                     
        sp_code:string,
        sp_message:string,
        method:string,
        date_time:string,
    }
}