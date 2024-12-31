import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './modules/users/user.router'
import authRouter from './modules/auth/auth.router'
import blogRouter from './modules/Blog/blog.router'

const app:Application = express()



// middleware 
app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/auth',  authRouter)
app.use('/api', blogRouter)




app.get('/', (req: Request, res: Response)=>{
    res.send("server is running!")
})

//  Global error handler 
// app.use()
//  Not found route 
// app.use()

export default app; 