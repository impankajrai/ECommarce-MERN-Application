import * as React from 'react';
import {Typography,List,ListItem,ListItemText,Grid,Button} from '@mui/material';
import { ButtonContainer } from './Style';
import { useSelector } from 'react-redux';


export default function Review({handleNext,handleBack}) {
const products=useSelector(globalState=>globalState.order.products)
const shippingDetails=useSelector(globalState=>globalState.order.shippingDetails)
const totalAmmount=products.map((data)=>data.price*(data.quantity||1)).reduce((acc,curr)=>acc+curr,0)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.description} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹ {totalAmmount}
          </Typography>
        </ListItem>
      </List>̥
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{shippingDetails.name}</Typography>
          <Typography gutterBottom>{shippingDetails.city}</Typography>
        </Grid>
       
          <ButtonContainer>
          <Button variant='contained' onClick={()=>handleBack()}>← Back</Button>
          <Button variant='contained' onClick={()=>handleNext()} type='submit'>Next →</Button>
        </ButtonContainer>

        </Grid>
      {/* </Grid> */}
    </React.Fragment>
  );
}