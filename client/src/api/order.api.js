import { axiosInstance } from "./axiosInstance";


const createOrderApi = async(data) => {
    try{
          const response = await axiosInstance.post("/edgistify/order/create-order",data);
          return response;
    }catch(err){
        throw err
    }
}

export {createOrderApi}