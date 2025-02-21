import axios from "axios";

const token = localStorage.getItem("authenticate")
const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    headers : {
        authenticate : token ? token : ""
    }
})

export {axiosInstance}