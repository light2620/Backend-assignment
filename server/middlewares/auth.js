import { response } from "express"
import jwt from "jsonwebtoken"

const verifiedUser = async (req, res, next) => {
    const header = req.header('authenticate')

    if (!header) {
        return res.json({
            message: "You have not login",
            error: true,
            success: false
        })
    }
    const token = header.split(" ")[1];
    console.log("token", token)
    if (!token) {
        return res.json({
            message: "You have not login",
            error: true,
            success: false
        })
    }

    const decode = await jwt.verify(token, process.env.TOKEN_KEY)
    if (!decode) {
        return res.json({
            message: "Unauthorize access denied",
            error: true,
            success: false
        })
    }

    req.userId = decode.id
    next();
}

export { verifiedUser }