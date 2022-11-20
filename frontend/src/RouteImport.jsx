import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Profile, Account, MyOrders, Cart, TrackOrders, HomePage, Product, Wishlist,ResetPassword} from "./Pages/index";
import PageNavigator from "./Pages/ProtectedRoute/PageNavigator";
import Checkout from "./Pages/Checkout/Checkout";


export default function RouteImport() {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<PageNavigator> <Profile /> </PageNavigator>} />
        <Route path="/account" element={<PageNavigator><Account /> </PageNavigator>} />
        <Route path="/orders" element={<PageNavigator><MyOrders /> </PageNavigator>} />
        <Route path="/cart" element={<PageNavigator><Cart /> </PageNavigator>} />
        <Route path="/trackorder" element={<PageNavigator><TrackOrders /> </PageNavigator>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/wishlist" element={<PageNavigator><Wishlist /> </PageNavigator>} />
        <Route path="/resetpassword/:token" element={<PageNavigator><ResetPassword /> </PageNavigator>} />
        <Route path="/checkout" element={<PageNavigator> <Checkout /> </PageNavigator>} />
      

        {/* admin routes */}
        {/* <Route path="/admin/" element={<AdminHomePage />}>
          <Route path="products" element={<AdminProduct />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="Offers" element={<AdminOffer />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="stocks" element={<AdminStock />} />
          <Route path="users" element={<AdminUser />} />
        </Route> */}
      </Routes>


    </>
  )
}
