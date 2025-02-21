
import { useSelector } from 'react-redux'

import ProductCart from '../components/ProductCart'

const Home = () => {

  const products = useSelector((state) => state.product.products)


  if (!products) {
    return <p className="text-white">Loding.....</p>
  }
  return (
    <div className="container mx-auto w-full mt-10">
      <div className='grid lg:grid-cols-5 text-white justify-items-center gap-3'>
        {
          products.map((item, index) => {

            return <ProductCart product={item} key={index + item._id} />
          })
        }
      </div>

    </div>
  )
}

export default Home
