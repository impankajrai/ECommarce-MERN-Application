import { Box, styled } from "@mui/material";

export const Body=styled(Box)({
    height:"80vh",
    width:"98vw",
    display:"flex",
    boxSizing:"border-box"
})
export const ImageContainer=styled(Box)({
    width:"25%",
    display:"flex",
    height:"100%",
    justifyContent:"center",
    flexDirection:"column",
    background:"white",
    alignItems:"center",
    position:"relative",
    "img":{ width: "171px",maxHeight: "349px"}
})
export const DetailsContainer=styled(Box)({
    width:"70%",
    padding:"20px",
    background:"#dfdede",
    borderRadius:"5px"
})
export const Ratting=styled(Box)({
fontWeight:"bold",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:14,
color:"white",
background:"green",
width:'4rem',
borderRadius:"10px"
})

export const Heading=styled('p')({
    fontSize:"16px",
    fontWeight:"bold",
    marginBottom:"0.5rem"
})

export const Price=styled('p')({
    fontWeight:'bold',
    fontSize:25,
    marginTop:"1rem"
})
export const Offers=styled(Box)({
    fontSize:"14px",
    display:"flex",
    alignItems:"center",
    lineHeight:"0"
})
export const Colors=styled(Box)(({color})=>({
    height:"20px",
    width:"20px",
    borderRadius:"50%",
    background:color
}))
export const ServicesList=styled('p')({
    margin:'10px 0',
    fontSize:"14px",
    fontWeight:"bold"
})

export const BuyBtnContainer=styled(Box)({
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    position:"absolute",
    bottom:"25px"
})