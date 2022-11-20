import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const ProductsContainer = styled(Box)({
  border: "1px solid darkgray",
  background:"white",
  width: "99%",
  minHeight: "390px",
  marginLeft: "5px",
  borderRadius: "5px",
  padding: "10px",
  boxSizing: "border-box",
  display:"flex",
  flexDirection:"column",
 
});

export const scrollerContainer=styled(Box)({
  width:"83%",
  padding:"10px"
})

export const CategoryName = styled(Box)({
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
  borderRadius: "5px",
  boxSizing: "border-box",
  textAlign: "center",
  background: "#1976d2",
  display: "flex",
  width: "10%",
  height: "100%",
  fontSize: 25,
});

export const ProductCard=styled(Box)({
minHeight:"300px",
width:"220px",
borderRadius:"5px",
border: "1px solid #dadada",
display:"flex",
justifyContent:"center",
alignItems:"center",
flexDirection:"column"
})


export const Image=styled("img")({
    width:"172px",
    height:"181px"
})
export const Title=styled('p')({
    margin:0,
    marginTop:"5px"
})

export const Discount=styled('p')({
    color:"green",
    margin:0,
    marginTop:"5px"
})
export const BrandName=styled("p")({
    margin:0,
    color:"gray",
    fontSize:"15px",
    marginTop:"5px"
})



//card design
export const ProductTitle=styled(Typography)({
  fontSize: 14,
        marginTop: 5
})

export const CardImage=styled('img')({
  width: 'auto',
  height: 100
})
export const CardeWrapper=styled(Box)({
  padding: '25px 15px',

})



