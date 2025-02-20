
import { CarModel } from "../cars/car.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";



const createOrderIntoDB = async(orderData: Order) =>{
   
    const singleCarInfo = await CarModel.findById({_id: orderData.car})
   

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

    const result = await OrderModel.create(orderData)
    return result;
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
    getOrderRevenueFromDB
}