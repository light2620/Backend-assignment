import { CartModel } from "../models/cart.model.js";
import { OrderModel } from "../models/order.model.js";
import { ProductModel } from "../models/product.model.js";


const createOrderController = async (req, res) => {
    try {

        const { userId } = req;
        const { products, totalPrice, shippingAddress } = req.body;


        if (!userId) {
            return res.json({
                message: "please login first",
                error: true,
                success: false
            })
        }

        if (!products || !totalPrice || !shippingAddress) {
            return res.status(401).json({
                message: "some fields are missing",
            })
        }
        products.forEach(async (item) => {
            await ProductModel.findByIdAndUpdate({ _id: item.productId }, { $inc: { stock: -item.quantity } })
        })

        const createOrder = new OrderModel({ userId, products, totalPrice, shippingAddress });
        await createOrder.save();
        const removeItemFromCart = await CartModel.deleteMany({ userId });
        return res.json({
            message: "order placed",
            error: false,
            success: true,
        })

    } catch (err) {
        return res.json({
            message: err.message || err
        })
    }
}


export { createOrderController }