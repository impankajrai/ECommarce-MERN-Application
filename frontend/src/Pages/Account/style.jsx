import { Box, styled } from "@mui/material";


export const Page=styled(Box)({
width:'98vw',
height:'82vh',
display:'flex',
justifyContent:'center',
alignItems:'center'

})

export const Container=styled(Box)({
  height: "250px",
  width: "600px",
  backgroundColor:'white',
  display: "flex",
  flexDirection: "column",
  borderRadius:"7px",
  alignItems:'center',
  justifyContent:'center',
  boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
  borderRadius:'5px',

})

export const SubContainer=styled(Box)({
  display:'flex',
  marginBottom:'25px',
  justifyContent:'center',
  alignItems:'center', 
  width:'100%'
})

export const Heading = styled("h3")(({margin,fontSize})=>({
    margin:"0 auto",fontSize,
    boxSizing: "border-box",
    marginTop:'10px'
  }));
  export const SubHeading=styled('h5')({
    margin:"5px 15px",
    marginTop:"15px",
    })
    
    export const Information=styled('p')({
    margin:"5px 15px",
    color:'darkgray'
    })
    