import { Schema } from "mongoose";
import { IUser } from "./user.interface";



const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required:[true , ' please give your name'],
        minlength: 3,
        maxlength: 30

    },
    email:{
        type: String, 
        required: [true , 'Give your email'], 
        unique: true, 
        validate: {
            validator: function(value){
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
            },
            message: `{value} is not a valid email`
        }
    },
    password:{
        type: String, 
        required: true
    },
    role:{
        type: String,
        enum:{
            values:['admin', 'user'], 
            message: '{value } is not correct role!'
        },
        default: 'user'
    }, 
    isBlocked:{
        type: Boolean,
        default: false
    }

})