import { Box, styled } from "@mui/material";


export const ButtonContainer=styled(Box)({
    display:"flex",
    width:"100%",
    alignItems:"center",
    marginTop:"40px",
    justifyContent:"flex-end",
    gap:20
})

export const DefaultAddress=styled(Box)({
    border:"1px solid #3498db",
    padding:"10px",
    display:"flex",
    borderRadius:"5px"
})

export const AddressContainer=styled(Box)({
    width:"90%",
    "h4":{margin:0},
    "p":{margin:0,fontSize:"14px",color:"gray"}
})

export const COD = styled(Box)({
    border: "1px solid #e0e0e0",
    padding: "7px 11px",
    borderRadius:"5px",
    position: "relative",
    minHeight:"110px"
}) 

export const CheckboxAndText= styled(Box)({
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
})
