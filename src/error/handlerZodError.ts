import { ZodError, ZodIssue } from "zod"
import { TErrorSource } from "../interface/error"
import { StatusCodes } from "http-status-codes"

   const handlerZodError  = (err:ZodError) => {

        const errorSource: TErrorSource = err.issues.map((issue:ZodIssue)=>{
         return{
            path: issue?.path[issue.path.length-1],
            message: issue.message
         }
            

        })

        const statusCode = StatusCodes.BAD_REQUEST

        return {
            statusCode,
            message : "Zod validation error!",
            errorSource
        }
    }


export default handlerZodError