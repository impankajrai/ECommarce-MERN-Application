import { Button } from "@mui/material";
import { Box, styled } from "@mui/system";

export const FullPage = styled(Box)({
  width: "99.5%",
  minHeight: "90vh",
});
export const HeadParagraph = styled("p")({
  width: "300px",
  fontStyle: "italic",
  color: "darkgray",
  fontSize: 14,
  letterSpacing: "1px",
});
export const HeadHeading = styled("h1")({
  margin: "50px",
  display: "inline-block",
  letterSpacing: "1px",
});
export const HeadSection = styled(Box)({
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
});
export const OrderContainer = styled(Box)({
  width: "94%",
  minHeight: "200px",
  border: "0.2px solid lightgray",
  borderRadius: "5px",
  background: "white",
  boxSizing: "border-box",
  boxShadow: "0px 10px 15px -3px rgb(0 0 0 / 10%)",
  margin:"20px auto"
});

export const OrderId = styled("p")({
  fontSize: 16,
  fontWeight: "bold",
  background: "#edebeb",
  borderRadius: "20px",
  display: "inline",
  padding: "6px 20px",
  span: {
    color: "#3d84ff",
  },
});
export const HeaderOfOrder = styled(Box)({
  display: "flex",
  padding: "20px",
  alignItems: "center",
  position: "relative",
  height:"85px"
 
});
export const OrderDate = styled("p")({
  marginLeft: "20px",
  fontStyle: "italic",
  color: "gray",
});
export const TrackOrderButton = styled(Button)({
  background: "#ff9800",
  borderRadius: "10px",
  color: "white",
  position: "absolute",
  right: 50,
  padding: "6px 20px",
  "&:hover": {
    background: "#a36100",
  },
});

//order listing css
export const OrderList = styled(Box)({
  height: "200px",
  padding: "20px",
  boxSizing:"border-box",
  overflow:"hidden"
});

export const ListItems = styled(Box)({
  display: "flex",
  height: "200px",
  padding: "10px",
  boxSizing: "border-box",
  justifyContent: "space-around"
});

export const ImageContainer=styled(Box)({
  width: "20%",
  height: "165px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  img:{
    maxWidth:"90%",
    maxHeight:"90%"
  }
})

export const ProductDeatils = styled(Box)({
  height: "180px",
  minWidth: "45%",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
});

export const TitleOfProduct = styled("p")({
  fontWeight: "bold",
  marginBottom: 0,
});
export const CompanyOfProduct = styled("p")({
  color: "gray",
  marginTop: "5px",
  fontSize:14,
  fontWeight:"bold"
});
export const CompanyAndSize = styled("p")({
  color: "gray",
  span: {
    color: "black",
    fontWeight: "bold",
  },
});

export const Status = styled('p')(({ color }) => ({
  color: "gray",
  span: {
    fontWeight: "bold",
    color,
    fontSize:"14px",
  },
}));

export const Price = styled(Box)(({ color }) => ({
  color: "gray",
  maxWidth:"50%",
  minWidth:"30%",
  display: 'flex',
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  lineHeight:"12px",
  span: {
    fontWeight: "bold",
    color,
    fontSize:"14px",
  },
}));

export const OrderDeliveryInfo=styled(Box)({
  position: "absolute",
  display: "flex",
  bottom: "-5px",
  left: "55px",
  width: "91%",
  fontSize: "15px",
  justifyContent: "space-between"
})


export const Delivered = styled("p")({
  color: "gray",
  span: {
    fontWeight: "bold",
    color: "black",
    fontSize:"14px",
  },
});

export const BottomSection=styled(Box)({
height:"50px",
display:"flex",
justifyContent:"space-between",
padding:"0 5%"
})