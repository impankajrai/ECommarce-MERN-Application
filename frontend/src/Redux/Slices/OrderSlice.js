import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const placeOrder=createAsyncThunk("placeOrder",async(payload)=>{
      const modifiedProducts=payload.products.map((items)=>({
          product:items._id,
          quantity:items.quantity }))


      let response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/order/placeorder`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({...payload,products:modifiedProducts})})

        response=await response.json();
       
        if(response.success){
          console.log("success")
          return response;
        }else(
            toast.error(response.message)
        )
})


const OrderSlice = createSlice({
  name: "order",
  initialState: {
    status:"",
    orderPlaced: false,
    orderId: "",
    products: [],
    shippingDetails: {
      name: "",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
    paymentDetails:{
      refrenceNumber:"",
      mode:"",
      ammount:""
    }
  },
  reducers: {
    addAddress: (State, action) => {
      const {name,mobile,line1,line2,landmark,city,state,pincode,country} = action.payload;
      State.shippingDetails.name = name;
      State.shippingDetails.mobile = mobile;
      State.shippingDetails.addressLine1 = line1;
      State.shippingDetails.addressLine2 = line2;
      State.shippingDetails.landmark = landmark;
      State.shippingDetails.city = city;
      State.shippingDetails.state = state;
      State.shippingDetails.pincode = pincode;
      State.shippingDetails.country = country;
    },

    addProduct:(State,action) =>{
        action.payload.map((items=>State.products.push(items)))
    },

    addPayment:(State,action) =>{
      State.paymentDetails.refrenceNumber = action.payload.refrenceNumber
      State.paymentDetails.mode = action.payload.mode
      State.paymentDetails.ammount = action.payload.ammount
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(placeOrder.fulfilled,(state,{payload})=>{
      state.orderId =payload.order._id
      state.orderPlaced = true
      toast.success(payload.message)
    })
  }
});

export const { addAddress,addProduct } = OrderSlice.actions;
export default OrderSlice.reducer;
