import { getCartItemApi } from "../api/cart.api";
import { setItems } from "../redux/cart.slice";

const fetchCart = async (dispatch) => {
    try {
        const response = await getCartItemApi();
        dispatch(setItems(response.data.data || []))
    } catch (err) {
        console.log(err)
    }
}

export { fetchCart }