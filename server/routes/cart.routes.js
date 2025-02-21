import { Router } from "express";
import { verifiedUser } from "../middlewares/auth.js";
import { addToCartController, deleteCartItem, getCartItem, updateCart } from "../controllers/cart.controller.js";

const cartRouter = Router();


cartRouter.post("/add-to-cart",[verifiedUser],addToCartController)
cartRouter.get("/get-cart",[verifiedUser],getCartItem)
cartRouter.post("/update",[verifiedUser],updateCart)
cartRouter.delete("/delete",[verifiedUser],deleteCartItem)


export {cartRouter}
