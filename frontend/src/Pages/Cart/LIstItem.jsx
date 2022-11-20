import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Button, Divider, IconButton, Tooltip } from "@mui/material";
import {CompanyOfProduct,Delivered,ImageContainer,ListItems,ProductDeatils,Qantity,RemoveButton,TitleOfProduct} from "./Style";
import { moveToWishlist, removeToCart, updateQantity} from "../../Redux/Slices/cartSlice";
import { receiveFromCart} from "../../Redux/Slices/wishlistSlice";
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const ListItem=({data})=>{
    const dispatch=useDispatch()
    const wishlist=useSelector(globalState=>globalState.wishlist)
    
    //move to wishlist
    const moveWishlist=()=>{
      if (wishlist.find((wishlist=>wishlist._id===data._id))) {
      toast.error("Product is already in wishlist,You can remove it")
      }else{
        dispatch(moveToWishlist(data._id))
        dispatch(receiveFromCart(data))
      }
    }
      return(
        <>
         <ListItems sx={{position:"relative",alignItems:"center"}}>
                
                {/* Remove button */}
                <Tooltip title="Remove">
                   <RemoveButton onClick={()=>{dispatch(removeToCart(data._id))}}>
                    <CloseIcon sx={{color:"red"}}/> 
                    </RemoveButton>
                    </Tooltip>

                  <ImageContainer>
                 <img
                   src={data?.photos[0]}
                   alt="Product" />
                  </ImageContainer>
    
                 {/* First Product */}
                 <ProductDeatils >
                   <TitleOfProduct>
                     {data?.name}
                   </TitleOfProduct>
                   <CompanyOfProduct>{data?.brand}</CompanyOfProduct>
                   <p>
                      
                     Size : XL &nbsp; | &nbsp;
                     <span style={{ fontWeight: "bold" }}>Rs. {data?.price}</span>
                   </p>
                 </ProductDeatils>
    
                 <Qantity>
                 
                 <IconButton onClick={()=>{dispatch(updateQantity({id:data._id,quantity:data.quantity+1}))}} > 
                 <AddCircleOutlineIcon sx={{color:"green"}}/>  
                 </IconButton>
                
                   <input type='text' value={data.quantity} disabled style={{fontWeight:"bold",fontSize:16}}/>
                   <IconButton sx={{color: data.quantity>0 ? "red":"gray"}} disabled={!(data.quantity>1)} onClick={()=>{dispatch(updateQantity({id:data._id,quantity:data.quantity-1}))}}> <RemoveCircleOutlineIcon/> </IconButton>
                 </Qantity>
                 <Delivered>
                 <Button  variant="outlined" onClick={moveWishlist} startIcon={<FavoriteBorderIcon />}>Move To Wish List </Button>
                 </Delivered>
               </ListItems>
               <Divider variant="fullWidth" />
        
        </>
      )}

      export default ListItem