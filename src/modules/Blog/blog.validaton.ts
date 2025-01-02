import { z } from "zod";



const  createBlogValidation = z.object({
    body:z.object({
            title: z.string({
                required_error:"Title is required"
            }),
            content:z.string(),
            author: z.string({
                required_error: 'Give author referce id'
            }),
            isPublished: z.boolean().optional()
    })

})

const updateBlogvalidation = z.object({
    body:z.object({
        title:z.string({
            invalid_type_error: 'Title must be string',
            required_error:'Title is requred'
        }),
        content:z.string(),

    })
})



export const blogValidation = {
    createBlogValidation,
    updateBlogvalidation
}