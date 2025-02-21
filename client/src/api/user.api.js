import { axiosInstance } from "./axiosInstance";


const loginApi = async(data)=>{
    try{
        console.log(data)
            const response = await axiosInstance.post("user/login",data)
            localStorage.setItem("authenticate",`Bearer ${response.data.token}`)
            return response;
    }catch(err){
        throw err;
    }
}


const registerApi = async(data)=>{
    try{
        
            const response = await axiosInstance.post("user/register",data)
            return response;
    }catch(err){
        throw err;
    }
}

const getUserDetailsApi = async()=>{
    try{
        const response = await axiosInstance.get("user/user")
        return response;
    }catch(err){
        throw err
    }
}

export {loginApi,registerApi,getUserDetailsApi}