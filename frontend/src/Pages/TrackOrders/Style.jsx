import { Box, styled } from "@mui/system";


export const Container = styled(Box)({
  // width: "94%",
  minHeight: "200px",
  border: "0.2px solid lightgray",
  borderRadius: "5px",
  background: "white",
  boxSizing: "border-box",
  boxShadow: "0px 10px 15px -3px rgb(0 0 0 / 10%)",
  margin:"20px auto"
});


export const HeaderOfOrder = styled(Box)({
  display: "flex",
  padding: "0 20px",
  fontSize:14,
  alignItems: "center",
  position: "relative",
});

export const Details = styled(Box)({
  display: "flex",
  height: "100px",
  boxSizing: "border-box",
  justifyContent: "space-around",
  img: {
    height: '100px',
    width: '100px'
  },
});

export const TrackingDetails = styled(Box)({
 
  width: "40%",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: 'center'
});

export const OrderId = styled("p")({
  fontWeight: "bold",
  marginBottom: 0,
  fontSize:14
});
export const OrderDate = styled("p")({
  color: "gray",
  fontStyle: "italic",
  marginTop: "5px",
  fontSize:14
});
export const CompanyAndSize = styled("p")({
  color: "gray",
  span: {
    color: "black",
    fontWeight: "bold",
  },
});

export const Status = styled(Box)(({ color }) => ({
  fontSize:14,
  width: "25%",
  padding: "10px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  color: "gray",
  justifyContent: "center",
  alignItems: "center",
  span: {
    fontWeight: "bold",
    color,
  },
}));
export const Delivered = styled(Box)({
  fontSize:14,
  width: "34%",
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

export const BottomSection=styled(Box)({
height:"50px",
display:"flex",
justifyContent:"space-between",
padding:"0 5%"

})

///Slider Code
export const Slider=styled(Box)(({progress='100%',bg='gray'})=>({
  background:bg,
  height:"5px",
  width:progress,
  border:"0.2px solid gray",
  position:"relative",
  borderRadius:"5px"
}))

export const SliderBreakPoints=styled("span")(({position,done=false})=>({
    backgroundColor: done? "green": "gray",
    borderRadius: "50%",
    width: '16px',
    position: 'absolute',
    top: '-4px',
    height: '13px',
    left:position+"%"
}))