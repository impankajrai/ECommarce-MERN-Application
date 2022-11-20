import React from "react";
import { useSelector,useDispatch } from "react-redux";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Box, Divider } from "@mui/material";
import {CartContainer,FullPage,HeaderButtons,HeaderOfCart,HeadHeading,HeadParagraph,HeadSection,OrderList} from "./Style";
import { clearCart} from "../../Redux/Slices/cartSlice";
import PricingSection from "./PricingSection";
import ListItem from "./LIstItem";
import Empty from "../../Components/EmptyItem/Empty";
import { receiveAllFromCart} from "../../Redux/Slices/wishlistSlice";

function Cart() {
  return (
    <FullPage>
      <Box style={{ display: "flex" }}>
        <CartHeader />
      </Box>

      <Box
        sx={{ display: "flex", width: "98vw", justifyContent: "space-evenly",flexWrap:"wrap" }}
      >
        <ItemsComponent />
        <PricingSection />
      </Box>
    </FullPage>
  );
}

//cart header component
const CartHeader = () => {
  return (
    <>
      <HeadSection>
        <HeadHeading>My Cart</HeadHeading>
        <HeadParagraph>
          View and edit all your items of cart
          <br />
          And also increase the quantity of product.
        </HeadParagraph>
      </HeadSection>
    </>
  );
};

//items container
const ItemsComponent = () => {
 
  const dispatch=useDispatch();
  const cartData=useSelector((globalstate)=>{
    return globalstate.cart;
  });

  const moveAllToWishlist=()=>{
    // dispatch(clearCart())
    console.log("hello>>>>>>>",cartData)
    dispatch(receiveAllFromCart(cartData));
  }
  
  return (
    <>
      <globalContainer>
        <CartContainer>
          <HeaderOfCart>
            <HeaderButtons onClick={moveAllToWishlist} variant="outlined" right={20} startIcon={<FavoriteBorderIcon />}>
              Move All To Wish List
            </HeaderButtons>
            <HeaderButtons
              variant="outlined"
              right={270}
              startIcon={<DeleteOutlineIcon />}
              sx={{color:"red",borderColor:"red"}}
              onClick={()=>dispatch(clearCart())}
            >
              Remove All
            </HeaderButtons>
          </HeaderOfCart>
          <Divider variant="middle" />

          {/* Orders List    */}
          <OrderList>
           {cartData.length?
            cartData.map((data)=>{
           return <ListItem data={data}/>
          })
           :<Empty/>}
          </OrderList>

          <Divider variant="middle" />
        </CartContainer>
      </globalContainer>
    </>
  );
};




export default Cart;
