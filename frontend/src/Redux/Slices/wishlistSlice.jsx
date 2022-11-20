import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//add to wishlist ===================================================================================================================
export const addToWishlist = createAsyncThunk("addToWishlist", async (product) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishlist/add`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ productId: product._id }),
  });

  const result = await res.json();
  if (result.success) {
    toast.success(result.message);
    return product;
  } else {
    toast.error(result.message);
    return null;
  }
});

// clear wishlist ===============================================================================================================
export const clearWishList = createAsyncThunk("clearWishList", async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishlist/clear`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  });
  const result = await res.json();
  if (result.success) {
    toast.success(result.message);
    return id;
  } else {
    toast.error(result.message);
  }
});


// remove to wishlist ===============================================================================================================
export const removeToWishlist = createAsyncThunk("removeToWishlist", async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishlist/remove`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const result = await res.json();
  if (result.success) {
    toast.success(result.message);
    return id;
  } else {
    toast.error(result.message);
  }
});

//Get data from cart- move to wishlist
export const receiveFromCart = createAsyncThunk("receiveFromCart", async (product) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishlist/add`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ productId: product._id }),
  });

  const result = await res.json();
  if (result.success) {
    toast.success("Moved Success")
    console.log("product>>>",product)
    return product;
  } else {
    return null;
  }
});

//Get data from cart- move to wishlist
export const receiveAllFromCart = createAsyncThunk("receiveAllFromCart", async (product) => {
  const ids=product.map(data=>data._id)
  console.log("ids=>",ids)

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishlist/addmany`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ids}),
  });

  const result = await res.json();
  if (result.success) {
    toast.success("Moved Success")
    return product;
  } else {
    return null;
  }
});


// fetch all data from wishlist ======================================================================================================
export const getWishlistData = createAsyncThunk("getWishlistData", async () => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wishlist`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  });
  const result = await res.json();
 if(result.length){
        return result
    }
    else{
        return []
    }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    resetWishlist:(state,payload)=>{
      state.length =0;
    }
  },
  extraReducers: (builder) => {
    //add to wishlist reducer --------------------------
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      if (action.payload) {
        const isExist = state.find((item) => item._id === action.payload.id);
        if (isExist) {
          state = [...state];
        } else {
          state.push(action.payload);
        }
      }
    });

    //add to wishlist from cart  --------------------------
    builder.addCase(receiveFromCart.fulfilled, (state, action) => {
      if (action.payload) {
        const isExist = state.find((item) => item._id === action.payload.id);
        if (isExist) {
          state = [...state];
        } else {
          state.push(action.payload);
        }
      }
    });

    //add all data into wishlist from cart  --------------------------
    builder.addCase(receiveAllFromCart.fulfilled, (state, action) => {
    
        console.log("ADDMANY")
      // if (action.payload) {
      //   const isExist = state.find((item) => item._id === action.payload.id);
      //   if (isExist) {
      //     state = [...state];
      //   } else {
      //     action.payload.map(data=>state.push(data));
      //   }
      // }
    });

    //remove to wishlist ---------------------------------------
    builder.addCase(removeToWishlist.fulfilled, (state, action) => {
      return (state = state.filter((Item) => Item._id !== action.payload));
    });

    //fetch all data from wishlist---------------------------------
    builder.addCase(getWishlistData.fulfilled,(state,action)=>{
           action?.payload?.map((product)=>{
            return state.push(product.product)
           })
    })

    //clear wishlist ---------------------------------
    builder.addCase(clearWishList.fulfilled,(state,action)=>{
          return state.length=0;
    })
  }
});

export const {resetWishlist}=wishlistSlice.actions
export default wishlistSlice.reducer;