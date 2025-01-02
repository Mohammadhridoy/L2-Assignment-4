import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import { TErrorSource } from "../interface/error"


const handlerValidationError = (err: mongoose.Error.ValidationError) =>{

    const errorSource: TErrorSource = Object.values(err.errors).map((value:mongoose.Error.ValidatorError | mongoose.Error.CastError )=>{

        return{
            path: value?.path,
            message:value?.message
        }

    })  

    return {
        statuscode: StatusCodes.BAD_REQUEST,
        message:"Validation Error",
        errorSource
    }

}

export default handlerValidationError