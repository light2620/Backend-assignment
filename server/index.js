import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDataBase } from "./config/db.js";
import { userRouter } from "./routes/user.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { orderRouter } from "./routes/order.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
  
    res.send("welcome"); 
});

app.use("/edgistify/user",userRouter);
app.use("/edgistify/cart",cartRouter);
app.use("/edgistify/product",productRouter);
app.use("/edgistify/order",orderRouter)



const PORT = process.env.PORT || 8080

connectDataBase();

app.listen(PORT,()=> {
    console.log("server is running on PORT " , PORT);
})