
import {Grid,TextField,Checkbox, Button,Accordion,AccordionSummary,AccordionDetails ,Typography, FormControlLabel,} from '@mui/material';
import { ButtonContainer, CheckboxAndText, COD } from './Style';
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../Redux/Slices/OrderSlice';

export default function PaymentForm({handleBack}) {
const dispatch = useDispatch()
const orderData=useSelector(globalState=>globalState.order)

const setAllFormData={
  status:"pending",
  products: orderData.products,
  shippingDetails: orderData.shippingDetails,
  paymentDetails:{
    refrenceNumber:"4565656888665dds",
    mode:"Cash On Delivery",
    ammount:orderData.products.map((data)=>data.price*(data.quantity||1)).reduce((acc,curr)=>acc+curr,0)
  }
}
const handelUPIsubmit=() => {
  dispatch(placeOrder(setAllFormData))
}

  return (
    <>
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Debit Card</Typography>
        </AccordionSummary>
        <AccordionDetails>

        <CardDeatails data={setAllFormData}/>

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Credit Card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        <CardDeatails  data={setAllFormData}/>

        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>UPI</Typography>
        </AccordionSummary>
        <AccordionDetails>

    
        <TextField fullWidth variant="standard" label="Enter UPI ID" size='sm'></TextField>
        <ButtonContainer>
          <Button variant='contained' type='submit' onClick={handelUPIsubmit} >Place Order</Button>
        </ButtonContainer>

        </AccordionDetails>
      </Accordion>
      <CashOnDelivery data={setAllFormData}>
      <Typography>Cash On Delivery</Typography>
      <FormControlLabel control={<Checkbox style={{color:"#3498db"}} value="true" />} />
      </CashOnDelivery>
      <ButtonContainer>
          <Button variant='contained' onClick={handleBack}>← Back</Button>
        </ButtonContainer>
 
    </>
  );
}



const CardDeatails=()=>{
  return (<>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <ButtonContainer>
          <Button variant='contained' type='submit' >Place Order</Button>
        </ButtonContainer>
      </Grid>
  
  </>)
}

const CashOnDelivery=({data}) => {
  const dispatch = useDispatch()
  const cashOnDelivery=() => {
    dispatch(placeOrder(data))
  } 

return (
  <>
    <COD>
      <CheckboxAndText>
        <Typography>Cash On Delivery</Typography>
        <FormControlLabel
          control={<Checkbox style={{ color: "#3498db" }} value="true" />}
        />
      </CheckboxAndText>

        <LoadingButton sx={{position:"absolute",right:10,bottom:10}} variant="contained" size='sm' type="submit" onClick={cashOnDelivery}>
          Place Order
        </LoadingButton>
    </COD>
  </>
);
}