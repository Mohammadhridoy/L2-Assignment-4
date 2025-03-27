import { Types } from "mongoose"



export type Order ={
    email: string,
    carId: string,
    quantity: number,
    totalPrice:number,
    status?: "pending" | "Paid" | "Shipped" | "Completed" | "Cancelled"
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