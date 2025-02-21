import { axiosInstance } from "./axiosInstance";



const getAllProductApi = async(data) => {
    try{
        const response = await axiosInstance.get("/product/get-products")
        return response;
    }catch(err){
        throw err;
    }
}


export {getAllProductApi}