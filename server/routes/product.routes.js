import { Router } from "express";
import { verifiedUser } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";
import { createProductController, getAllProductsController } from "../controllers/product.controller.js";


const productRouter = Router();

productRouter.post("/add-product",[verifiedUser,isAdmin],createProductController)
productRouter.get("/get-products",getAllProductsController)

export {productRouter}