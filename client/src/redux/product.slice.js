import { createSlice } from "@reduxjs/toolkit";


const proudctSlice = createSlice({
      name : "product",
      initialState : {
        products : null
      },
      reducers: {
        setProduct : (state,action)=>{
              state.products = action.payload
              
        }
      }
})


export const {setProduct} = proudctSlice.actions;
export default proudctSlice.reducer