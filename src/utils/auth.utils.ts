import jwt from 'jsonwebtoken'    
    
    
    type Tjwtpayload = {
        email: string,
        role:string
    }
    const createToken = (jwtpayload: Tjwtpayload, secret: string, expiresIn: string )=>{
        return jwt.sign(jwtpayload, secret, {
            expiresIn
        })
    }

   

    export default  createToken; 