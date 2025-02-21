import { ProductModel } from "../models/product.model.js";


const createProductController = async (req, res) => {
    try {
        const { title, description, stock, price, image } = req.body
        if (!title || !description || (stock === undefined || stock === null) || !price || !image) {
            return res.json({
                message: "all fields are mandatory",
                error: true,
                success: false
            })
        }
        if (price <= 0) {
            return res.json({
                message: "price must be greater than 0",
                success: false,
                error: true
            })
        }

        const newProduct = new ProductModel({ title, description, stock, price, image });
        await newProduct.save();
        return res.json({
            message: "product is created success fully",
            error: false,
            success: true,
            prodcut: newProduct
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

const getAllProductsController = async (req, res) => {
    try {
        const products = await ProductModel.find();

        if (products.length === 0) {
            return res.json({
                message: "No products found",
                success: false,
                error: true
            });
        }

        return res.json({
            message: "Products fetched successfully",
            success: true,
            error: false,
            products
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

export { createProductController, getAllProductsController };
