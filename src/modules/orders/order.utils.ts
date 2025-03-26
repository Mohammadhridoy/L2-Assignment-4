import Shurjopay from "shurjopay"

import config from "../../config"

const shurjopay = new Shurjopay()

shurjopay.config(
    config.sp_endpoint,
    config.sp_username,
    config.sp_password,
    config.sp_prefix,
    config.sp_return_url
)


const makePaymentAsync = async(paymentPaload:any) => {
    
   return new Promise((resolve, reject)=>{
        shurjopay.makePayment(paymentPaload, 
            (response) => resolve(response),
            (error) => reject(error)
        )
    })
    
    // const paymentResult =  await 
    // return paymentResult
}

export const orderUtils = {
    makePaymentAsync
}
