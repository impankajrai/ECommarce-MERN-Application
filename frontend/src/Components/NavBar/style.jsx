import { Box, Button, styled } from "@mui/material";

export const SearchBarContainer = styled(Box)({
  maxWidth: "100%",
  backgroundColor: "white",
  height: "40px",
  width: "600px",
  border: "1px solid black",
  borderRadius: "7px",
  position: "relative",
});

export const Dropdown = styled("ul")({
  borderRadius: "0 0 2px 2px",
  padding: 0,
  position: "absolute",
  backgroundColor: "#fff",
  color: "#000",
  zIndex: 9,
  listStyle: "none",
  boxShadow: "2px 3px 5px -1px rgb(0 0 0 / 50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  top: "25px",
  width: "100%",
  boxSizing: "border-box",

});

export const DropdownItems = styled(Box)({
  display: "flex",
  cursor:"pointer",
  alignItems: "center",
  boxSizing: "border-box",
  height: "50px",
  padding: "5px",
  borderBottom: "0.2px solid gray",
  overflow: "hidden",
  img: { height: "35px" },
  ".left": {
    width: "13%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".right": {
    width: "88%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    p: { fontSize: "14px", color: "grey", margin: 0 },
    h5: { margin: 0 },
  },
  "&:hover": {
    backgroundColor: "#0062cc82",
    color: "white",
    "p":{
      color:"white"
    }
  },
});

export const CustomSearch = styled("input")({
  height: "83%",
  width: "90%",
  marginLeft: "10px",
  border: "none",
  outline: "none",
  borderRadius: "6px",
  fontSize: 16,
});


export const RightNavContainer=styled(Box)({
    display: { xs: "none", md: "flex" }, 
   position:"absolute",
   right:10
})

export const NavProfilePic=styled('img')({
  width: "30px",
  borderRadius: "50%"
})

export const CustomButton = styled(Button)({
  fontSize: 14,
  color: "white",
  height: "40px",
  margin: "auto 20px",
  padding: "10px 30px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});
