import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1
    }

})

const CartModel = mongoose.model("cart", cartSchema)


export { CartModel }