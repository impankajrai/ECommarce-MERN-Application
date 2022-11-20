import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//add to cart ===================================================================================================================
export const addToCart = createAsyncThunk("addToCart", async (product) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/add`, {
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
    console.log({...product,quantity:result.product.quantity})
    return({...product,quantity:result.product.quantity});
  } else {
    toast.error(result.message);
    return null;
  }
});

// remove to cart ===============================================================================================================
export const moveToWishlist = createAsyncThunk("moveToWishlist", async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/remove`, {
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
    return id;
  } 
});

// remove to cart ===============================================================================================================
export const removeToCart = createAsyncThunk("removeToCart", async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/remove`, {
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

// clear cart ===============================================================================================================
export const clearCart = createAsyncThunk("clearCart", async (id) => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/clear`, {
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


// increase/decrease the quantity of product ======================================================================================
export const updateQantity = createAsyncThunk("updateQuantity", async ({id,quantity}) => {

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart/updatequantity`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ productId: id,quantity}),
  });

  const result = await res.json();
  if (result.success) {
    return {id,quantity};
  }
});


// fetch all data from cart ======================================================================================================
export const getCartData = createAsyncThunk("getCartData", async () => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cart`, {
    method: "get",
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


const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    resetCart:(state,payload)=>{
      state.length =0;
    }
  },
  extraReducers: (builder) => {
    //add to cart reducer --------------------------
    builder.addCase(addToCart.fulfilled, (state, action) => {
      if (action.payload) {
        const isExist = state.find((item) => item._id === action.payload.id);
        if (isExist) {
          state = [...state];
        } else {
          state.push(action.payload);
        }
      }
    });
    //remove to cart ---------------------------------------
    builder.addCase(removeToCart.fulfilled, (state, action) => {
      return (state = state.filter((Item) => Item._id !== action.payload));
    });

    //move to wishlist ---------------------------------------
    builder.addCase(moveToWishlist.fulfilled, (state, action) => {
      return (state = state.filter((Item) => Item._id !== action.payload));
    });

    //clear cart ---------------------------------------
    builder.addCase(clearCart.fulfilled, (state, action) => {
      return state=[]
    });

    //fetch all data from cart---------------------------------
    builder.addCase(getCartData.fulfilled,(state,action)=>{
           action?.payload?.map((product)=>{
            return state.push({...product.product,quantity:product.quantity})
           })
    })


    //update quantity ----------------------------------------
    builder.addCase(updateQantity.fulfilled,(state,action)=>{
      state.flat().forEach((items)=>{
       if (items._id===action.payload.id) {
         items.quantity=action.payload.quantity
       }
      })
        
    })

  },
});

export const {resetCart}=cartSlice.actions
export default cartSlice.reducer;
