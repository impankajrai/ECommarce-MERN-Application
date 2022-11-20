import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export const getProducts=createAsyncThunk("getProduct", async()=>{
    
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      });
  const response=await res.json();
  if (response){
    return response
  }else{
    toast.error("Something went wrong");
    return null;
  }
  
  // return await axios
    // .get(
    //   `${process.env.REACT_APP_BACKEND_URL}/product`)
    // .then((response) => {
    //   if (response) {
    //     return response.data;
    //   }
    // })
    // .catch(() => {
    //   toast.error("Something went wrong");
    // });

})

const Products = createSlice({
    name: "auth",
    initialState: [],
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.fulfilled, (state, action) => {
                state.push(action.payload)
        })
    }
})

export default Products.reducer;