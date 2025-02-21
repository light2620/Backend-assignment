import AddToCartButton from "./AddToCartButton"
const ProductCart = ({ product, key }) => {

  return (
    <div key={key} className="bg-white  rounded w-[300px] p-2 gap-y-2 flex flex-col items-center justify-evenly text-neutral-700" >
      <div className="h-[20vh]">
        <img src={product.image} alt="" className="w-full h-full object-scale-down" />
      </div>
      <p className="line-clamp-2 text-lg text-center ">{product.title}</p>
      <p className="text-xl">₹ {product.price}</p>
      <AddToCartButton product={product} />

    </div>)
}

export default ProductCart
