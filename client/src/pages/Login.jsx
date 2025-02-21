import { useState } from "react"
import { Link } from "react-router-dom"
import { loginApi } from "../api/user.api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { fetchUser } from "../lib/fetchUserDetails"
import { useDispatch } from "react-redux"
const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleChange(e) {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev, [name]: value
            }
        })
        console.log(data);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await loginApi(data);
            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message)
                localStorage.setItem("authenticate", `Bearer ${response.data.token}`)
                await fetchUser(dispatch);
                setData({
                    email: "",
                    password: ""
                })
                navigate("/");
                window.location.reload();


            }
            if (response.data.error) {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className=" container mx-auto w-[500px] bg-white rounded p-6 mt-20 ">
            <div className="text-5xl text-emerald-500 font-bold text-center">
                <h1>Login</h1>
            </div>
            <div className='mt-10'>
                <form action="" className="flex flex-col gap-6">
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="text-xl font-semibold text-neutral-700">Email</label>
                        <input
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="w-full p-2 focus-within:outline-none  border-3  border-neutral-300 rounded-sm focus-within:border-emerald-500"
                            placeholder="e.g. your@gmail.com"
                            type="email" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="text-xl font-semibold text-neutral-700">Password</label>
                        <input
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="w-full p-2 focus-within:outline-none  border-3  border-neutral-300 rounded-sm focus-within:border-emerald-500"
                            placeholder="password"
                            type="password" />
                    </div>
                    <button onClick={handleSubmit} className="bg-emerald-500 text-white font-semibold py-1 rounded text-2xl cursor-pointer hover:bg-emerald-600 hover:text-neutral-200">
                        Login
                    </button>
                </form>
            </div>
            <p className="mt-2 text-center">
                Don't have account? <Link to={"/register"} className='font-semibold text-emerald-500 hover:text-green-800'>Register</Link>
            </p>
        </div>
    )
}

export default Login
