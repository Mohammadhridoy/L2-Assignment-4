import { Router } from "express";
import { userController } from "./user.controller";
import validateRequst from "../../Middlewares/validateRequest";
import { userValidation } from "./user.validation";



const userRouter = Router()

userRouter.post('/register', validateRequst(userValidation.createUserValidationSchema), userController.register)
userRouter.post('/login', validateRequst(userValidation.loginValidaton),  userController.login )

export default userRouter; 