import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequst from "../../Middlewares/validateRequest";
import { userValidation } from "../users/user.validation";




const authRouter = Router()

authRouter.post('/register', validateRequst(userValidation.createUserValidationSchema), authController.register )



export default authRouter; 