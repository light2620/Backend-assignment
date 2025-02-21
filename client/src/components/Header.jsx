import { Link, useNavigate } from "react-router-dom"
import { TiShoppingCart } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import UserDetailModel from "./UserDetailModel";
import { useState } from "react";
import { setEmail } from "../redux/user.slice";
import { setName } from "../redux/user.slice";
import { setItems } from "../redux/cart.slice";
import CartModel from "./CartModel";
const Header = () => {
    const userName = useSelector((state) => state.user.name);
    const userEmail = useSelector((state) => state.user.email)
    const [userModel, setUserModel] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.items)
    const [cartModel, setCartModel] = useState(false)
    function handleLogout() {
        localStorage.clear();
        dispatch(setName(""));
        dispatch(setEmail(""));
        dispatch(setItems([]));
        setUserModel(false);
        navigate("/", { replace: true });
        window.location.reload();
    }

    return (
        <header className="min-h-[10vh] border-2 flex items-center bg-black py-6 ">
            <div className="container mx-auto">
                <nav className="flex items-center justify-between">
                    <div className="text-7xl font-bold text-emerald-500 ">
                        <Link to="/">Edgistify</Link>
                    </div>
                    <div className="flex items-center gap-10">
                        {userName ? <div className="relative" onClick={() => setUserModel(!userModel)}>
                            <Link className="text-neutral-500 text-3xl hover:text-white">
                                {userName}
                            </Link>
                            {userModel && <UserDetailModel name={userName} email={userEmail} handleLogout={handleLogout} />}
                        </div> : <Link to="login" className="text-neutral-500 font-semibold hover:text-white text-3xl rounded-xl p-1 pb-3 px-4 cursor-pointer" >Login</Link>
                        }
                        <div onClick={() => setCartModel(true)} className="relative">
                            <Link>
                                <TiShoppingCart className="text-white text-5xl mt-2" />
                            </Link>
                            {cart.length !== 0 && <div className="absolute bg-white text-neutral-800 rounded-full w-6 h-6 text-center top-2 right-0 shadow-3xl cursor-pointer">{cart.length}</div>}
                        </div>

                    </div>
                </nav>
            </div>
            {cartModel && <CartModel close={() => setCartModel(false)} />}
        </header>
    )
}

export default Header
