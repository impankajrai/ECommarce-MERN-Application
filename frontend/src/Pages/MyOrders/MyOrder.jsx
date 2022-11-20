import { Box } from "@mui/system";

import React, {useState} from "react";
import {FullPage,HeadHeading,HeadParagraph,HeadSection} from "./Style";
import { useEffect } from "react";
import OrdersList from "./OrdersList";
import Empty from "../../Components/EmptyItem/Empty";


function MyOrder() {
  const [ordersData,setOrdersData]=useState([])

  const fetchData=async () => {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/order`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
   
    response=await response.json();
    console.log("response>>>>>",response);
    setOrdersData(response.order)
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <FullPage>
      <Box style={{ display: "flex" }}>
        <HeadSection>
          <HeadHeading> My Orders</HeadHeading>
          <HeadParagraph>
            View and edit all your pending, delivered and returned order here.
          </HeadParagraph>
        </HeadSection>
      </Box>
    {ordersData.length?ordersData.map((order)=><OrdersList order={order}/>):<Empty/>}
   </FullPage>
  );
}

export default MyOrder;
