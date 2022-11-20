import { Button, IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";

export const FullPage = styled(Box)({
  width: "60%",
  minHeight: "90vh",
});

export const globalContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width:"70%"
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
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "flex-start",
});
export const CartContainer = styled(Box)({
  width: "94%",
  minHeight: "200px",
  border: "0.2px solid lightgray",
  borderRadius: "5px",
  background: "white",
  boxSizing: "border-box",
  boxShadow: "0px 10px 15px -3px rgb(0 0 0 / 10%)",
  margin: "20px auto",
});

export const HeaderOfCart = styled(Box)({
  display: "flex",
  padding: "20px",
  alignItems: "center",
  position: "relative",
  height: "30px",
});
export const OrderDate = styled("p")({
  marginLeft: "20px",
  fontStyle: "italic",
  color: "gray",
});
export const HeaderButtons = styled(Button)(({ right }) => ({
  borderRadius: "10px",
  padding: "6px 20px",
  position: "absolute",
  right,
}));

//order listing css
export const OrderList = styled(Box)({
  minHeight: "200px",
  padding: "20px",
  margin:"0 15px"
});

export const RemoveButton = styled(IconButton)({
  position:"absolute",
  right:10,
  top:0
})

export const ListItems = styled(Box)({
  display: "flex",
  height: "200px",
  padding: "10px",
  boxSizing: "border-box",
  position:"relative",
  justifyContent: "space-around",
  img: {
   height:"100px"
  },
});




export const ProductDeatils = styled(Box)({
  height: "180px",
  width: "30%",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
});

export const ImageContainer = styled(Box)({
  height:"100%",
  width:"160px",
  display:"flex",
  alignItems: "center",
  justifyContent:"center"
});

export const TitleOfProduct = styled("p")({
  fontWeight: "bold",
  marginBottom: 0,
});
export const CompanyOfProduct = styled("p")({
  color: "gray",
  fontStyle: "italic",
  marginTop: "5px",
});
export const CompanyAndSize = styled("p")({
  color: "gray",
  span: {
    color: "black",
    fontWeight: "bold",
  },
});

export const Qantity = styled(Box)({
  height: "180px",
  width: "30%",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  color: "gray",
  justifyContent: "center",
  alignItems: "center",
  input: {
    height:"30px",
    width:"40px"
  },
});
export const Delivered = styled(Box)({
  height: "180px",
  width: "30%",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: "gray",
  span: {
    fontWeight: "bold",
    color: "black",
  },
});

export const BottomSection = styled(Box)({
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
  padding: "0 5%",
});

export const PricingContainer = styled(Box)({
  boxShadow: "0px 10px 15px -3px rgb(0 0 0 / 10%)",
  padding: "10px",
  width: "25%",
  height: "500px",
  border: "0.2px solid lightgray",
  margin: "20px",
  borderRadius: "5px",
});

export const PromoCodeLabel=styled('p')({
  fontStyle: "italic",
  marginBottom: "-10px",
  marginLeft: "12px",
  marginTop: "20px",
}); 

export const PromoCodeContainer = styled(Box)({
  display: "flex",
  padding: "10px",
  justifyContent: "space-around",
  alignItems: "center",
  marginBottom: "20px",
})

export const PromoCode = styled("input")({
  marginTop: "5px",
  width: "60%",
  height: "30px",
  borderRadius: "5px",
});

export const Heading = styled("h3")({
  margin: "15px 10px",
});

export const ChildContainer = styled(Box)({
  // border: "1px solid black",
  minHeight: "100px",
  borderRadius: "5px",
  padding: "20px",
});
export const CostLine = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  lineHeight: "10px",
  fontWeight: "bold",
  "& .price": {
    color: "gray",
  },
});


//Empty cart styling
export const EmptyCartContainer=styled(Box)({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column",
  img:{
    width:"150px"
  },
  p:{
    fontWeight: 'bold',
    fontSize: '16px',
    color: 'gray',
  },
 
})