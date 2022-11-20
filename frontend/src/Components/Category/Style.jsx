import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const Component=styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
    overflowX: 'overlay'
  
})

export const Container=styled(Box)({
    padding: '12px 8px',
    textAlign: 'center'
})
export const MenuImage=styled('img')({
    width: 64,
    cursor:"pointer"
})
export const MenuText=styled(Typography)({
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor:"pointer"
})
