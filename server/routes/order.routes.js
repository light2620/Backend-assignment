import Router from 'express'
import { verifiedUser } from '../middlewares/auth.js';
import { createOrderController } from '../controllers/order.controller.js';


const orderRouter = Router();


orderRouter.post("/create-order",[verifiedUser],createOrderController)
export {orderRouter}