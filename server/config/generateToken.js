import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();
const generateToken = async(userId) => {
    try{
        const token = await jwt.sign({id: userId},process.env.TOKEN_KEY,{expiresIn : '12h'})
        return token;
    }catch(err){
        console.log(err)
    }
}


export {generateToken};