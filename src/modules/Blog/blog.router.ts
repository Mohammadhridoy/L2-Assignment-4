import { Router } from "express";
import validateRequst from "../../Middlewares/validateRequest";
import { blogValidation } from "./blog.validaton";
import { blogController } from "./blog.controller";



const blogRouter = Router()


blogRouter.post('/blogs', validateRequst(blogValidation.createBlogValidaton), blogController.createBlog)



export default blogRouter