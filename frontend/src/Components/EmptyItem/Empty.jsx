import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EmptyCartContainer } from "./Style";



const Empty=()=>{
    const navigate=useNavigate();
  
    return(<>
      <EmptyCartContainer >
      <img src="/images/emptyCart.svg" alt="Empty Cart Image" />
      <p>No item found..</p>
      <Button onClick={()=>navigate('/')} variant="contained" size="small">Shop Now</Button>
      </EmptyCartContainer>
  
  </>)
}

  export default Empty;