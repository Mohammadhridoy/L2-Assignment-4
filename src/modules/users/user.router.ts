import { Router } from "express";
import { userController } from "./user.controller";
import validateRequst from "../../Middlewares/validateRequest";
import { userValidation } from "./user.validation";



const userRouter = Router()

userRouter.post('/create-admin', validateRequst(userValidation.createUserValidationSchema), userController.createAdmin)


export default userRouter; 