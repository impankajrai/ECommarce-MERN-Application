import {useDispatch} from 'react-redux';
import {addToCart} from '../../Redux/Slices/cartSlice'
import {Button, Typography,Box } from "@mui/material";
import {ButtonContainer, Card} from './Style'
import { removeToWishlist } from '../../Redux/Slices/wishlistSlice';

const ProductCard=({data})=>{
    const dispatch=useDispatch();

    return(<>
     <div>
        <Box textAlign="center">
          <Card onClick={()=>console.log("hello")}>
            <img
              src={data.photos[0]}
              alt="0"
              style={{ maxHeight: "150px",
                paddingTop: "20px",
                maxWidth: "200px"}}
            />
            <Typography style={{ fontWeight: 600, color: "#212121" }}>
              {data.name}
            </Typography>
            <Typography style={{ color: "green" }}> ₹ {data.price}</Typography>
            <Typography style={{ color: "#212121", opacity: ".6" }}>
             {data.brand}
            </Typography>
            <ButtonContainer>
              <Button variant="contained" size="small" onClick={()=>{dispatch(addToCart(data))}}>Add To Cart</Button>
              <Button variant="contained" size="small" onClick={()=>dispatch(removeToWishlist(data._id))}>Remove</Button>
            </ButtonContainer>
          </Card>
        </Box>
      </div>
    </>)
  }

  export default ProductCard