import { Box, Button, Divider } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import Popup from '../../Components/Popup'
import { BottomSection, Delivered, HeaderOfOrder, OrderContainer, OrderDate, OrderDeliveryInfo, OrderId, Status, TrackOrderButton } from './Style'
import TrackOrder from '../TrackOrders/TrackOrder';
import ProductList from './ProductList';

function OrdersList({order}) {
    const [openPopup,setOpenPopup]=useState(false)
    console.log(order)
    

  return (
    <Box sx={{  display: "flex",  flexDirection: "column",  alignItems: "center",  justifyContent: "center" }}>
        <OrderContainer>
          <HeaderOfOrder>
            
            <OrderDeliveryInfo>
              <Delivered> Expected Delivery Date &nbsp;:&nbsp; <span>{(order.createdAt).substring(0,10)}</span></Delivered>
              <Status color='green'>Status &nbsp; : &nbsp; <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></Status>
            </OrderDeliveryInfo>

            <OrderId>
              Order ID &nbsp;<span>{` ${order._id}`}</span>
            </OrderId>
            <OrderDate>{`Order Placed On ${(order.createdAt).substring(0,10)}`}</OrderDate>
            <TrackOrderButton onClick={()=>{setOpenPopup(true)}} startIcon={<ShareLocationIcon />}>
              Track Order
            </TrackOrderButton>
          </HeaderOfOrder>
          <Divider variant="middle" />

        {order.products.map((product)=><ProductList quantity={product.quantity} product={product.product}/>)}
 
        <BottomSection>
        <Button sx={{fontWeight:"bold"}} startIcon={<CloseIcon/>} size="small"> Cancel Order </Button>
        <p style={{color:"gray"}}>{`Pay Using ${order.paymentDetails.mode}`}</p>
        <p style={{fontWeight:"bold"}}>{`Rs. ${order.paymentDetails.ammount}`}</p>
        </BottomSection>

        </OrderContainer>
        {/* Popup */}
        <Popup open={openPopup} setopen={setOpenPopup} marginTop="0"  fullWidth={true} maxWidth='md'>
          <TrackOrder/>
        </Popup>
      </Box>
  )
}

export default OrdersList