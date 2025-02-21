
import { Link } from 'react-router-dom'
const Register = () => {
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
                            required
                            className="w-full p-2 focus-within:outline-none border-3  border-neutral-300 rounded focus-within:border-emerald-500"
                            placeholder="e.g. shivam negi"
                            type="text" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="text-xl font-semibold  text-neutral-700">Email</label>
                        <input
                            name="email"
                            required
                            className="w-full p-2 focus-within:outline-none border-3  border-neutral-300 rounded focus-within:border-emerald-500"
                            placeholder="e.g. your@gmail.com"
                            type="email" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="email" className="text-xl font-semibold text-neutral-700">Password</label>
                        <input
                            name="password"
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
                            className="w-full p-2 focus-within:outline-none  border-3  border-neutral-300 rounded focus-within:border-emerald-500"
                            placeholder="password"
                            type="password" />
                    </div>
                    <button className="bg-emerald-500 text-white font-semibold py-1 rounded text-2xl cursor-pointer hover:bg-emerald-600 hover:text-neutral-200">
                        Login
                    </button>
                </form>
            </div>
            <p className="mt-2 text-center">
                Already have account? <Link to={"/login"} className='font-semibold text-emerald-500 hover:text-green-800'>Login</Link>
            </p>
        </div>
    )
}

export default Register
