import { z } from "zod";


const carValidationSchema = z.object({
    brand: z.string().max(20),
    model:z.string().max(20),
    year:z.number(),
    price: z.number(),
    category: z.enum(["Sedan" , "SUV" , "Truck" , "Coupe" ,"Convertible"]), 
    description: z.string(),
    quantity: z.number(),
    inStock: z.boolean(),
    isDeleted: z.boolean().optional()

})

export default carValidationSchema; 
