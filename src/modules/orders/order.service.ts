
import { CarModel } from "../cars/car.model";
import { User } from "../users/user.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";
import { orderUtils } from "./order.utils";



const createOrderIntoDB = async(orderData: Order, client_ip:string) =>{

    
   
    const singleCarInfo = await CarModel.findById({_id: orderData.carId})
   

    // get the car id from order database
    const carId = singleCarInfo?._id

    // Now, we check quantity goes to zero.
    await CarModel.findOneAndUpdate(
        // we find the user info
        {_id:carId, quantity:{$eq: 0}},

        // if quantity is zero, set instock is false.
        {
            $set:{inStock: false}
        }
    )

       
    // if quantity is less than order quantity
    const insufficientStock = await CarModel.findOne(
        {_id:carId, quantity:{$lt: orderData.quantity} }
    )

    if(insufficientStock){
        throw new Error("insufficient Stock and this product out of Stock!")
    }


    //  reduce the quantity in the car model.
    await CarModel.updateOne(
            {_id:carId,  quantity:{$gte:orderData.quantity}},
            {
                $inc:{quantity: -orderData.quantity},
            }
            
        )



        let totalprice = orderData.totalPrice
        totalprice*=orderData.quantity
        // console.log("dddd",totalprice);

        const email = orderData?.email
        const user = await User.findOne({email})

     


    let  order = (await OrderModel.create(orderData))


    const shurjopayPayload = {
        amount: totalprice,
        order_id: order._id,
        currency:"BDT",
        customer_name: user?.name,
        customer_address:"N/A",
        customer_email:user?.email,
        customer_phone: "N/A",
        customer_city:"N/A",
        client_ip

    }

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload)

    if(payment.transactionStatus){
       order = await  order.updateOne({
            transaction:{
                id:payment.sp_order_id,
                transactionStatus:payment.transactionStatus
            }
        })
    }


    
    return payment.checkout_url;

}

   
// verifypayment////////
const verifyPayment = async(order_id:string) =>{
    const verifyPayment =await orderUtils.verifyPaymentAsync(order_id)
    
    if(verifyPayment.length){
        await OrderModel.findOneAndUpdate({
            "transaction.id": order_id
        },{
            "transaction.bank_status":verifyPayment[0].bank_status,
            "transaction.sp_code":verifyPayment[0].sp_code,
            "transaction.sp_message,":verifyPayment[0].sp_message,
            "transaction.transactionStatus":verifyPayment[0].transaction_status,
            "transaction.method":verifyPayment[0].method,
            "transaction.date_time":verifyPayment[0].date_time,
            status: verifyPayment[0].bank_status == "Success"?"Paid":
            verifyPayment[0].bank_status == "Failed"? "Pending"
            :verifyPayment[0].bank_status =="Cancel"?"Cancelled":""            
        })
    }

    return verifyPayment
}


const getAllOrderDatafromBD = async() =>{
    const getAllorder = await OrderModel.find()
    return getAllorder
}


const getOrderRevenueFromDB = async() =>{

    const result = await OrderModel.aggregate([
        {
            $project:{
                totalPrice: {$multiply:["$totalPrice", "$quantity"]}
            }
        },
        {
            $group:{
                _id:null,
                totalRevenue:{$sum: "$totalPrice"}
            }
        }
    ])
    return result.length>0? result[0].totalRevenue :0; 

    
}



export const orderService = {
    createOrderIntoDB,
    getOrderRevenueFromDB,
    verifyPayment,
    getAllOrderDatafromBD
}