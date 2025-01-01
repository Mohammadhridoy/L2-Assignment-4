import { z } from "zod";



const  createBlogValidaton = z.object({
    body:z.object({
            title: z.string(),
            content:z.string(),
            author: z.string({
                required_error: 'Give author referce id'
            }),
            isPublished: z.boolean().optional()
    })

})


export const blogValidation = {
    createBlogValidaton
}