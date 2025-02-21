import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { addToCartApi, deleteCartItemApi } from '../api/cart.api';
import toast from 'react-hot-toast';
import { fetchCart } from '../lib/fetchCart';
import { updateCartApi } from '../api/cart.api';

const AddToCartButton = ({ product }) => {
  const productId = product._id;
  const cart = useSelector((state) => state.cart.items);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [qty, setQty] = useState(1);
  const [currentCartItem, setCurrentCartItem] = useState()
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAlreadyInCart(cart.some((item) => productId === item.productId._id));

    const product = cart.find((item) => item.productId._id === productId);
    setQty(product?.qty);
    setCurrentCartItem(product);

  }, [product, cart])


  async function addItemToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await addToCartApi({ productId, qty })

      if (response.data.success) {
        toast.success(response.data.message);
        fetchCart(dispatch)
      }
      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err)
    }
  }
  async function increaseQuantity(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (qty < 5) {
        const response = await updateCartApi({ qty: qty + 1, cartId: currentCartItem._id, action: "increase" })
        if (response.data.success) {
          toast.success(response.data.message);
          fetchCart(dispatch)
        }
        if (response.data.error) {
          toast.error(response.data.message);
        }
      }

    } catch (err) {
      console.log(err);
    }
  }

  async function decreaseQuantity(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (qty > 1) {
        const response = await updateCartApi({ qty: qty - 1, cartId: currentCartItem._id, action: "decrease" })
        if (response.data.success) {
          toast.success(response.data.message);
          fetchCart(dispatch)
        }
        if (response.data.error) {
          toast.error(response.data.message);
        }
      }

    } catch (err) {
      toast.error("can not add more than 5")
    }
  }
  async function deleteItemFromCart(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await deleteCartItemApi({ cartId: currentCartItem._id })
      if (response.data.success) {
        toast.success("item removed");
        fetchCart(dispatch)
      }
      if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (err) {
      console.log(err)
    }
  }
  if (product.stock === 0) {
    return (
      <h1 className="font-semibold text-xl">
        Out of Stock
      </h1>
    )
  }
  return (

    isAlreadyInCart ? (
      <div className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-lg">
        <button
          disabled={qty === 1}
          onClick={decreaseQuantity}
          className={`p-1 rounded-full ${qty === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 cursor-pointer"} hover:bg-gray-400  `}
        >
          <AiOutlineMinus size={18} />
        </button>
        <span className="text-lg font-semibold">{qty}</span>
        <button
          onClick={increaseQuantity}
          disabled={qty === 5}
          className={`p-1 rounded-full ${qty === 5 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 cursor-pointer"}  hover:bg-gray-400 cursor-pointer`}
        >
          <AiOutlinePlus size={18} />
        </button>
        <button
          onClick={deleteItemFromCart}
          className="ml-2 p-1 rounded-full text-black hover:text-red-700 cursor-pointer"
        >
          <MdDelete size={20} />
        </button>
      </div>
    ) : (
      <div
        onClick={addItemToCart}
        className="bg-emerald-500 text-center text-white font-semibold text-lg rounded py-1 px-2 shadow cursor-pointer">
        Add To Cart
      </div>
    )


  )
}

export default AddToCartButton
