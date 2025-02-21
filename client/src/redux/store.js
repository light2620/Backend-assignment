import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product.slice"
import userReducer from "./user.slice"
import cartReducer from "./cart.slice"
const store = configureStore({
    reducer:{
        product : productReducer,
        user : userReducer,
        cart : cartReducer
    }
})


export {store}