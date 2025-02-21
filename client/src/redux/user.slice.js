import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState :{
        name : "",
        email : ""
    },reducers : {
        setName : (state,action)=> { 
            state.name = action.payload
        },
        setEmail : (state,action)=> {
            
            state.email = action.payload
            console.log(state.email)
        }
    }
})

export const {setName,setEmail} = userSlice.actions
export default userSlice.reducer;