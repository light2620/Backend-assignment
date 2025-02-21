import { getUserDetailsApi } from "../api/user.api";
import { setName } from "../redux/user.slice";
import { setEmail } from "../redux/user.slice";

const fetchUser = async (dispatch) => {
    try {
        const response = await getUserDetailsApi();
        dispatch(setName(response.data.data.name));
        dispatch(setEmail(response.data.data.email));

    } catch (err) {
        console.log(err);
    }
}

export { fetchUser }