import { Box, styled } from "@mui/system";

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