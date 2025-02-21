import { axiosInstance } from "./axiosInstance";


const getCartItemApi = async(data) => {
    try{
        const response = await axiosInstance.get("/edgistify/cart/get-cart")
        return response;

    }catch(err){
          throw err
    }
}

const addToCartApi = async(data) => {
    try{
        const response = await axiosInstance.post("/edgistify/cart/add-to-cart",data)
        return response;

    }catch(err){
          throw err
    }
}

const updateCartApi = async(data) => {
    try{
        const response = await axiosInstance.post("/edgistify/cart/update",data)
        return response;

    }catch(err){
          throw err
    }
}

const deleteCartItemApi = async(data) => {
    try{
        console.log(data);
        const response = await axiosInstance.delete("/edgistify/cart/delete",{
            data
        })
        return response;

    }catch(err){
          throw err
    }
}

export {updateCartApi,deleteCartItemApi,getCartItemApi,addToCartApi}