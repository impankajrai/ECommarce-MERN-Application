import {Grid,Typography,TextField,FormControlLabel,Checkbox, Button, Box }from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AddressContainer, ButtonContainer, DefaultAddress } from './Style';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { addAddress } from '../../Redux/Slices/OrderSlice';


export default function AddressForm({handleNext}) {
    const [disableForm,setDisableForm]=useState(true)
    const {register ,unregister,handleSubmit,formState: { errors }} = useForm({mode: "onChange"});

    const user=useSelector(globalState=>globalState.user)
    const dispatch = useDispatch();

  const handelCheck=(e)=>{
    if (e.target.checked){
      setDisableForm(true);
      unregister("name")
      unregister("mobile")
      unregister("line1")
      unregister("line2")
      unregister("landmark")
      unregister("city")
      unregister("state")
      unregister("pincode")

    }else{
      setDisableForm(false);
    }
  }

  const onSubmit=(data)=>{
    if(data){
      dispatch(addAddress(data))
    }
    if(disableForm){
      dispatch(addAddress({...user.address, city:`${user.address.subDistrict}, ${user.address.district}`,name:user.name,mobile:user.mobile,country:"India"}))
    }

    handleNext()
  }


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3} component='form' noValidate  onSubmit={handleSubmit(onSubmit)} >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={disableForm}
            name='name'
            label="Name"
            autoComplete="given-name"
            variant="standard"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register("name", { required: !disableForm && "Enter your name" })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={disableForm}
            type='number'
            name='mobile'
            label="Mobile"
            autoComplete="given-mobile"
            variant="standard"
            error={Boolean(errors.mobile)}
            helperText={errors.mobile?.message}
            {...register("mobile", { required: !disableForm && "Enter mobile number" })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            disabled={disableForm}
            name="line1"
            fullWidth
            label="Address line 1"
            autoComplete="shipping address-line1"
            variant="standard"
            error={Boolean(errors.line1)}
            helperText={errors.line1?.message}
            {...register("line1", { required: !disableForm && "Enter first name" })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address line 2"
            disabled={disableForm}
            name='line2'
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            error={Boolean(errors.line2)}
            helperText={errors.line2?.message}
            {...register("line2", { required: !disableForm && "Enter first name" })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="landmark"
            label="Landmark"
            disabled={disableForm}
            autoComplete="landmark"
            variant="standard"
            fullWidth
            error={Boolean(errors.landmark)}
            helperText={errors.landmark?.message}
            {...register("landmark", { required: !disableForm && "Enter first name" })}
          />
        </Grid>
        

        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={disableForm}
            label="City"
            name="city"
            autoComplete="shipping address-level2"
            variant="standard"
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
            {...register("city", { required: !disableForm && "Enter first name" })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={disableForm}
            label="State/Province/Region"
            variant="standard"
            name="state"
            error={Boolean(errors.state)}
            helperText={errors.state?.message}
            {...register("state", { required: !disableForm && "Enter first name" })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="pincode"
            disabled={disableForm}
            label="Zip / Postal code"
            autoComplete="shipping postal-code"
            variant="standard"
            error={Boolean(errors.pincode)}
            helperText={errors.pincode?.message}
            {...register("pincode", { required: !disableForm && "Enter first name" })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Country"
            value="India"
            disabled
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <DefaultAddress>
                <AddressContainer>
                <h4>{user.name}</h4>
                <p>{`${user.mobile} || ${user.address.line1}, ${user.address.line2},${user.address.landmark}`}</p>
                <p>{`${user.address.subDistrict}, ${user.address.district},(${user.address.state})`}</p>
                </AddressContainer>
                <Box>
                <FormControlLabel control={<Checkbox style={{color:"#3498db"}} defaultChecked onChange={handelCheck} value="true" />} />
                </Box>
          </DefaultAddress>
        </Grid>
        <ButtonContainer>
          <Button variant='contained' type='submit' >Next →</Button>
        </ButtonContainer>
      </Grid>
    </>
  );
}