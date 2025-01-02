import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './modules/users/user.router'
import authRouter from './modules/auth/auth.router'
import blogRouter from './modules/Blog/blog.router'
import { StatusCodes } from 'http-status-codes'
import adminRouter from './modules/Admin/admin.router'
import globalErrorHandler from './Middlewares/globalErrorHandler'


const app:Application = express()



// middleware 
app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/auth',  authRouter)
app.use('/api', blogRouter)
app.use('/api/admin', adminRouter)




app.get('/', (req: Request, res: Response)=>{
    res.send("server is running!")
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