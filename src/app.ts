import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './modules/users/user.router'
import { StatusCodes } from 'http-status-codes'
import adminRouter from './modules/Admin/admin.router'
import globalErrorHandler from './Middlewares/globalErrorHandler'
import { carRoutes } from './modules/cars/car.route'
import { orderRouter } from './modules/orders/order.route'


const app:Application = express()



// middleware 
app.use(express.json())
app.use(cors({origin: 'http://localhost:5173',  credentials:true}))

app.use('/api/auth', userRouter)
app.use('/api', carRoutes)
app.use('/api', orderRouter)
app.use('/api/admin', adminRouter)




app.get('/', (req: Request, res: Response)=>{
    res.send("CarBackend server is running!")
})

//  Global error handler 
app.use(globalErrorHandler)

//  Not found route 
app.use('*', (req:Request, res:Response) =>{
    res.status(StatusCodes.NOT_FOUND).json({
        status:false,
        message:"Route Not Found!", 
    })
}
)

export default app; 