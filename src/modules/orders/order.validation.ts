import { z } from "zod";



const orderValidationSchema = z.object({
    email: z.string(),
    carId: z.string(),
    quantity: z.number(),
    totalPrice:z.number()
})


export default orderValidationSchema; 