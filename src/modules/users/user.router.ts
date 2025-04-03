import { Router } from "express";
import { userController } from "./user.controller";
import validateRequst from "../../Middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../Middlewares/auth";



const userRouter = Router()

userRouter.post('/register', validateRequst(userValidation.createUserValidationSchema), userController.register)
userRouter.post('/login', validateRequst(userValidation.loginValidaton),  userController.login )
userRouter.get("/user", userController.allUsers)
userRouter.get("/user/:email", userController.getSingleUser)
userRouter.post("/user/changepassword", auth('user', 'admin'), userController.changePassword)
userRouter.post('/user/blocked',  userController.isBlockedUser ),
userRouter.post('/refresh-token', userController.getRefreshToken)

export default userRouter; 