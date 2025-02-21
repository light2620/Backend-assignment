import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../api/user.api';
import toast from 'react-hot-toast';
const Register = () => {
    const [data,setData] = useState({
        name : "",
        email: "",
        password: "",
        confirmPassword : ""
      });
      const navigate = useNavigate();
      function handleChange(e){
        const {name,value}= e.target
        setData((prev)=> {
              return {...prev,[name] : value};
        })
      }
    async function registerUser(e){
        e.preventDefault();
        try{
            const response = await registerApi(data)
            console.log(response)
            if(response.data.success){
              toast.success(response.data.message);

              setData({
                name : "",
                email: "",
                password: "",
                confirmPassword : ""
              })
              navigate("/login")
            }
            if(response.data.error){
                toast.error(response.data.message);
            }
        }catch(err){
            toast.error("something went wrong, try again")
        }
    }
    return (
        <div className=" container mx-auto w-[500px] bg-white rounded p-6 mt-20 ">
            <div className="text-5xl text-emerald-500 font-bold text-center">
                <h1>Register</h1>
            </div>
            <div className='mt-10'>
                <form action="" className="flex flex-col gap-6">
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="text-xl font-semibold text-neutral-700">Name</label>
                        <input
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 focus-within:outline-none border-3  border-neutral-300 rounded focus-within:border-emerald-500"
                            placeholder="e.g. shivam negi"
                            type="text" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="text-xl font-semibold  text-neutral-700">Email</label>
                        <input
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 focus-within:outline-none border-3  border-neutral-300 rounded focus-within:border-emerald-500"
                            placeholder="e.g. your@gmail.com"
                            type="email" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="text-xl font-semibold text-neutral-700">Password</label>
                        <input
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 focus-within:outline-none border-3   border-neutral-300 rounded focus-within:border-emerald-500"
                            placeholder="password"
                            type="password" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="text-xl font-semibold text-neutral-700">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            required
                            value={data.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 focus-within:outline-none  border-3  border-neutral-300 rounded focus-within:border-emerald-500"
                            placeholder="password"
                            type="password" />
                    </div>
                    <button 
                    onClick={registerUser}
                    className="bg-emerald-500 text-white font-semibold py-1 rounded text-2xl cursor-pointer hover:bg-emerald-600 hover:text-neutral-200">
                        Register
                    </button>
                </form>
            </div>
            <p 
            className="mt-2 text-center">
                Already have account? <Link to={"/login"} className='font-semibold text-emerald-500 hover:text-green-800'>Login</Link>
            </p>
        </div>
    )
}

export default Register
