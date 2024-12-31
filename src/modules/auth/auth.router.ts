import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequst from "../../Middlewares/validateRequest";
import { userValidation } from "../users/user.validation";
import loginValidaton from "./auth.validation";




const authRouter = Router()

authRouter.post('/register', validateRequst(userValidation.createUserValidationSchema), authController.register )
authRouter.post('/login', validateRequst(loginValidaton), authController.login)



export default authRouter; 