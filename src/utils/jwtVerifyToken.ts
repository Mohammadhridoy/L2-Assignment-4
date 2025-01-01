import jwt from 'jsonwebtoken'  




const verifyToken = (token:any, accessSecret:string)=>{
    return jwt.verify(token, accessSecret)
}


export default verifyToken;