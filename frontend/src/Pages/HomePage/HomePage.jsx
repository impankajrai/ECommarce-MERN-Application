import React, { useEffect} from "react";
import ListItem from "./ListItem";
import Banner from "./Banner";
import Box from "@mui/material/Box";
import Category from "../../Components/Category/Category";
import { useDispatch,useSelector } from "react-redux";
import {getProducts} from '../../Redux/Slices/productSlice'



function HomePage() {
  const dispatch=useDispatch();
  const data=useSelector((state)=>state.products[0])

  useEffect(()=>{
    dispatch(getProducts())
  }
  ,[])


  return (
    <>
    <Category/>
    <Banner/>
      <Box xs={{display:"flex"}} style={{padding:"10px"}}>
        {data?.map((products)=>{
          return(
            <scrollerContainer>
                <ListItem data={products[Object.keys(products)[0]]} title={`Top In ${Object.keys(products)[0]}`} />
            </scrollerContainer>)
        })}
        </Box>
    </>
  );
}

export default HomePage;
