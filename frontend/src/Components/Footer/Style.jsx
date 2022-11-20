import { Box, styled } from "@mui/material";

export const FooterContainer=styled(Box)({
    width: "100%",
    color: "white",
    height: 175,
    marginTop: "60px",
    backgroundColor: "#1976d2",
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
})
export const InnerContainer=styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
})
export const List=styled('ul')({
    listStyle:"none"
})