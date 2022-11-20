import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/cartSlice";
import userslice from './Slices/authanticationSlice'
import productSlice from "./Slices/productSlice";
import wishlistSlice from "./Slices/wishlistSlice";
import OrderSlice from "./Slices/OrderSlice";


export const Store=configureStore({
    reducer:{
        cart:CartSlice,
        wishlist:wishlistSlice,
        user:userslice,
        products:productSlice,
        order:OrderSlice
    }
});