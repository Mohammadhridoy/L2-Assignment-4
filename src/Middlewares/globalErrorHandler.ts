import { ErrorRequestHandler} from "express";
import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";
import handlerZodError from "../error/handlerZodError";
import config from "../config";
import handlerValidationError from "../error/handlerValidationError";
import { StatusCodes } from "http-status-codes";




const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) =>{

    
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message  // Internal Server Error
    let  errorSource: TErrorSource = [{
        path:' ',
        message: 'Something went wrong'
    }]




 

    if(err instanceof ZodError){
        const  retunError = handlerZodError(err)
        statusCode = retunError.statusCode
        message=retunError.message
        errorSource = retunError.errorSource
    }else if( err.name =="ValidationError" ){
        const retunError = handlerValidationError(err)
        statusCode = retunError?.statuscode,
        message= retunError?.message,
        errorSource = retunError?.errorSource
    } else if(err.name =="JsonWebTokenError" || err.name == "TokenExpiredError"){
        statusCode = StatusCodes.BAD_REQUEST,
        message = err.message,
        errorSource[0].message = "AUTH_ERROR"
    } else if(err.statusCode == 401){
        statusCode = StatusCodes.UNAUTHORIZED,
        errorSource[0].message = "AUTHORIZATION_ERROR"
    }




    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config.NODE_ENV === "development"? err?.stack : null  
        
    })

 


}


export default globalErrorHandler;