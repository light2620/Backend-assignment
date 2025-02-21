import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";


const addToCartController = async (req, res) => {
    try {
        const { userId } = req;
        console.log(userId);
        const { productId, qty } = req.body;
        if (!userId) {
            return res.json({
                message: "Log in first",
                success: false,
                error: true
            })
        }
        if (!productId) {
            return res.status(400).json({
                message: "product id is not provided",
            })
        }
        const cartItem = await CartModel.find({ userId, productId });

        if (cartItem.length !== 0) {
            return res.json({
                message: "item is already in cart",
                error: true,
                success: false
            })
        }

        const newCartItem = new CartModel({ userId, productId, qty });
        await newCartItem.save()
        return res.json({
            message: "item added to cart",
            success: true,
            error: false
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || message,
            error: true,
            success: false
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId } = req
        const { cartId, qty, action } = req.body
        if (!userId) {
            return res.json({
                message: "Log in first",
                success: false,
                error: true
            })
        }
        if (!cartId) {
            return res.status(400).json({
                message: "cart id is not provided",
            })
        }
        if (qty <= 0) {
            return res.stats(400).json({
                message: "quantity can not be 0"
            })
        }
        const cart = await CartModel.findById({ _id: cartId });
        const productId = cart.productId;
        const product = await ProductModel.findById({ _id: productId });
        console.log("product", product)
        if (qty > product.stock) {
            return res.json({
                message: "no enough stock",
                success: false,
                error: true
            })
        }


        const updateCart = await CartModel.findByIdAndUpdate({ _id: cartId }, { qty });
        return res.json({
            message: "done",
            success: true,
            error: false
        })


    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

const getCartItem = async (req, res) => {
    try {

        const { userId } = req
        const cartItem = await CartModel.find({ userId }).populate("productId");
        if (cartItem.length === 0) {
            return res.json({
                message: "no item in cart",
                success: false,
                error: true
            })
        }

        return res.json({
            mesage: "cart fetch successfully",
            success: true,
            error: false,
            data: cartItem
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}


const deleteCartItem = async (req, res) => {
    try {
        const { userId } = req;
        if (!userId) {
            return res.json({
                message: "you are not login",
                success: false,
                error: true
            })
        }

        const { cartId } = req.body;
        if (!cartId) {
            return res.json(401).json({
                message: "cart id is not provided",
            })
        }

        const deleteItem = await CartModel.findByIdAndDelete({ _id: cartId })
        return res.json({
            message: "Item removed",
            success: true,
            error: false
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}
export { addToCartController, getCartItem, updateCart, deleteCartItem }