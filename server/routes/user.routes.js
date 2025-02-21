import { Router } from "express";
import { getUserDetails, userLoginController, userRegisterController } from "../controllers/user.controller.js";
import { verifiedUser } from "../middlewares/auth.js";


const userRouter = Router();



userRouter.post("/register",userRegisterController)
userRouter.post("/login",userLoginController)
userRouter.get("/user",[verifiedUser],getUserDetails)
export {userRouter}