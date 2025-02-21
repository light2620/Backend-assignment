import { getAllProductApi } from "../api/product.api";
import { setProduct } from "../redux/product.slice";
const fetchProducts = async (dispatch) => {
   try {
      const response = await getAllProductApi();
      dispatch(setProduct(response.data.products))

   } catch (err) {
      console.log(err);
   }
}

export { fetchProducts }