import { z } from "zod";

const createUserValidationSchema = z.object({
    body:z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        role : z.enum(['admin', 'user']).optional(),
        isBlocked: z.boolean().optional(), 
    })
})


const loginValidaton = z.object({
    body: z.object({
        email:z.string({
            required_error: "Email must be provided and must be a string"
        }).email(),
        password:z.string({required_error: "Password is required"})
    })
})



export const userValidation = {
    createUserValidationSchema,
    loginValidaton
}