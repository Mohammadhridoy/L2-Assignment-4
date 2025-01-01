import { Router } from "express";
import validateRequst from "../../Middlewares/validateRequest";
import { blogValidation } from "./blog.validaton";
import { blogController } from "./blog.controller";
import auth from "../../Middlewares/auth";



const blogRouter = Router()


blogRouter.post('/blogs', auth('user'), validateRequst(blogValidation.createBlogValidaton), blogController.createBlog)



export default blogRouter