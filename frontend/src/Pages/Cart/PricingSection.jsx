import { useSelector,useDispatch } from "react-redux";
import {Box,Button, Divider } from "@mui/material";
import {ChildContainer,CostLine,Heading,PricingContainer,PromoCode, PromoCodeContainer, PromoCodeLabel} from "./Style";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../Redux/Slices/OrderSlice";


const PricingSection = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const cartData=useSelector((globalstate)=>{
      return globalstate.cart;
    });

    const price=cartData.map((data)=>data.price*data.quantity).reduce((acc,curr)=>acc+curr,0)
    const handelChange=() =>{
      dispatch(addProduct(cartData))
      navigate('/checkout')
    }


    return (
      <>
        <PricingContainer>
          <Heading>Order Summary</Heading>
          <Divider variant="middle" />
          <PromoCodeLabel>
            Have a promo code ?
          </PromoCodeLabel>
  
          <PromoCodeContainer>
            <PromoCode type="text" placeholder="Enter Promo Code Here" />
            <Button variant="contained" sx={{ height: "30px" }}>
              Check
            </Button>
            <Divider variant="middle" />
          </PromoCodeContainer>
  
          <ChildContainer>
            <CostLine>
              <p>Shipping Cost</p> <p className="price">0.00</p>
            </CostLine>
            <CostLine>
               
              <p>Discount</p> <p style={{ color: "green" }}>- 00.00</p> 
            </CostLine>
            <CostLine>
               
              <p>Tax</p> <p className="price">0.00</p>
            </CostLine>
            <CostLine>
               
              <p>Price</p> <p className="price">{price}</p>
            </CostLine>
            <Divider variant="fullWidth" />
            <CostLine>
               
              <p>Sub Total</p> <p className="price">{price}</p>
            </CostLine>
          </ChildContainer>
          <Box
            sx={{ margin: "10px 0", display: "flex", justifyContent: "center" }}
          >
            <Button variant="contained" size="small" onClick={handelChange}>
              checkout 
            </Button>
          </Box>
        </PricingContainer>
      </>
    );
  };
  
  export default PricingSection