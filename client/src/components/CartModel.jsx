import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { useState } from 'react'
import { deleteCartItemApi } from '../api/cart.api'
import toast from 'react-hot-toast'
import { fetchCart } from '../lib/fetchCart'
import { IoMdClose } from "react-icons/io";
import { createOrderApi } from '../api/order.api'
import { fetchProducts } from '../lib/fetchProducts'
const CartModel = ({ close }) => {
    const cart = useSelector(state => state.cart.items)

    const dispatch = useDispatch();
    const navigate = "/"
    const [address, setAddress] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
    })

    const isAddressFilled = Object.values(address).every(el => el != "");
    const totalBill = cart.reduce((prev, curr) => {
        return prev + curr.productId.price;
    }, 0)
    const totalQty = cart.reduce((prev, curr) => { return prev + curr.qty }, 0)

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'pincode' && value !== "" && isNaN(value)) return
        setAddress((prev) => {
            return { ...prev, [name]: value };
        })
        console.log(address)
    }

    async function deleteItemFromCart(e, cartId) {
        e.preventDefault();
        e.stopPropagation();
        try {
            const response = await deleteCartItemApi({ cartId })
            if (response.data.success) {
                toast.success("item removed");
                await fetchCart(dispatch)
            }
            if (response.data.error) {
                toast.error(response.data.error);
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function makePayment() {
        const products = cart.map((item) => { return { productId: item.productId._id, quantity: item.qty, price: item.productId.price } })
        const orderDetails = {
            totalPrice: totalBill,
            shippingAddress: address,
            products
        }
        try {
            const response = await createOrderApi(orderDetails);
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchCart(dispatch)
                await fetchProducts(dispatch)
                close();
                navigate("/")
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-white flex items-center justify-center ' style={{ backgroundColor: 'rgba(31, 41, 55, 0.6)' }}>

            <div className="relative bg-white w-[900px] p-8 rounded ">
                {cart.length == 0 ? <p className="text-2xl text-center font-bold text-neutral-400">Cart is Empty</p> : <div className="flex gap-2 justify-between">
                    <div className='w-[55%]'>
                        <p className="text-4xl font-bold text-emerald-500 mb-10">Cart</p>
                        <div className="overflow-y-auto h-70 p-2 flex flex-col gap-4">
                            {cart.map((item, index) => {

                                const totalPrice = item.productId.price * item.qty
                                return <div key={item._id + index} className=' relative flex gap-5 items-center'>
                                    <div onClick={(e) => deleteItemFromCart(e, item._id)} className='absolute text-xl top-0 right-0 cursor-pointer'><IoMdClose /></div>
                                    <div className="w-20 h-20">
                                        <img src={item.productId.image} alt="product image" className='w-full h-full object-scale-down' />
                                    </div>
                                    <div className=' w-full self-start flex flex-col gap-1'>
                                        <p className="text-lg line-clamp-2 leading-tight">{item.productId.title}</p>
                                        <p className="text-base">Qty: {item.qty}</p>
                                        <p className="text-sm">Total Price: {totalPrice} <span>(qty x price)</span></p>
                                    </div>
                                    <AddToCartButton product={item.productId} />
                                </div>
                            })}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className='text-2xl font-bold'>Bill Details </h1>
                            <p><span className="font-semibold text-lg">Total Bill:</span> ₹ {totalBill} </p>
                            <p><span className="font-semibold text-lg">Total Qty:</span> {totalQty} </p>

                        </div>
                    </div>
                    <div className="w-[40%]">
                        <h1 className="text-4xl font-bold text-emerald-500 mb-5" >Address</h1>
                        <form action="" className="flex flex-col gap-2">
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="addressLine1" className="text-xl text-neutral-600 font-semibold">Address 1</label>
                                <input
                                    id="addressLine1"
                                    name="address1"
                                    onChange={handleChange}
                                    value={address.address1}
                                    className="focus-within:outline-none border-2 border-neutral-500 p-1 rounded focus-within:border-3"
                                    type="text" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="addressLine1" className="text-xl text-neutral-600 font-semibold">Address 2</label>
                                <input
                                    id="addressLine2"
                                    name="address2"
                                    onChange={handleChange}
                                    value={address.address2}
                                    className="focus-within:outline-none border-2 border-neutral-500 p-1 rounded focus-within:border-3"
                                    type="text" />
                            </div>
                            <div className='flex flex-col gap-1 '>
                                <label htmlFor="city" className="text-xl text-neutral-600 font-semibold">City</label>
                                <input
                                    id="city"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    className="focus-within:outline-none border-2 border-neutral-500 p-1 rounded focus-within:border-3"
                                    type="text" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="state" className="text-xl text-neutral-600 font-semibold">State</label>
                                <input
                                    id="state"
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    className="focus-within:outline-none border-2 border-neutral-500 p-1 rounded focus-within:border-3"
                                    type="text" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="pincode" className="text-xl text-neutral-600 font-semibold">Pincode</label>
                                <input
                                    id="pincode"
                                    name="pincode"
                                    maxLength={6}
                                    value={address.pincode}

                                    onChange={handleChange}
                                    className="focus-within:outline-none border-2 border-neutral-500 p-1 rounded focus-within:border-3"
                                    type="text" />
                            </div>
                        </form>
                        <button
                            onClick={makePayment}
                            className={`${isAddressFilled ? "bg-black cursor-pointer hover:shadow-2xl " : "bg-neutral-500 cursor-not-allowed"} w-full text-xl font-semibold rounded   mt-4 text-white py-2`}>Make Payment</button>
                    </div>
                </div>}
                <div onClick={close} className='absolute text-3xl top-6 right-6 cursor-pointer'><IoMdClose /></div>
            </div>

        </div>

    )
}

export default CartModel
