import { Router } from "express";
import auth from "../../Middlewares/auth";
import { adminController } from "./admin.controller";



const adminRouter = Router()

adminRouter.patch('/users/:userId/block', auth('admin'),   
    adminController.updateUserStatusByAdmin
)




export default adminRouter;