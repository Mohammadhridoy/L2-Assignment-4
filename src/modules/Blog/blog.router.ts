import { Router } from "express";
import validateRequst from "../../Middlewares/validateRequest";
import { blogValidation } from "./blog.validaton";
import { blogController } from "./blog.controller";
import auth from "../../Middlewares/auth";



const blogRouter = Router()


blogRouter.post('/blogs', auth('user'), validateRequst(blogValidation.createBlogValidation), blogController.createBlog)
blogRouter.get("/blogs", blogController.getAllblogs )
blogRouter.patch('/blogs/:id', auth('user'), validateRequst(blogValidation.updateBlogvalidation), blogController.updateBlog )
blogRouter.delete('/blogs/:id', auth('user','admin'), blogController.deleteBlog  )



export default blogRouter