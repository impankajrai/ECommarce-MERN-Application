import {Avatar,Button,CssBaseline,TextField,Grid,Box,Typography,Container} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from "react-hook-form";
import { updateUser } from '../../Redux/Slices/authanticationSlice';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";



const theme = createTheme();
function AddressInfo() {
const user=useSelector(globalState=>globalState.user)   
const {register,handleSubmit,formState: { errors }} = useForm();
const dispatch=useDispatch();

const {district,houseNumber,landMark,line1,line2,pinCode,state,subDistrict}=user.address;

const onsubmit=(data)=>{

  const formData=new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
   }
  dispatch(updateUser(formData))
}
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Edit Address Information
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onsubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="line1"
                  label="Address Line 1"
                  name="line1"
                 defaultValue={line1?line1:""}
                 error={Boolean(errors.line1)}
                 helperText={errors.line1?.message}
                 {...register("line1", { required: "Enter address line 1" })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="line2"
                  label="Address Line 2"
                  name="line2"
                  defaultValue={line2?line2:""}
                  error={Boolean(errors.line2)}
                  helperText={errors.line2?.message}
                  {...register("line2", { required: "Enter address line 2" })}
                  autoComplete="line2"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="landmark"
                  label="landmark"
                  type="text"
                  id="landmark"
                  error={Boolean(errors.landMark)}
                  helperText={errors.landMark?.message}
                  {...register("landMark", { required: "Enter Nearest LandMark" })}
                  defaultValue={landMark?landMark:""}
                />

              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="houseNumber"
                  required
                  fullWidth
                  id="houseNumber"
                  label="House Number"
                  defaultValue={houseNumber?houseNumber:""}
                  error={Boolean(errors.houseNumber)}
                  helperText={errors.houseNumber?.message}
                  {...register("houseNumber", { required: "Enter House Number" })}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="pincode"
                  label="Area Pin Code"
                  name="pincode"
                  autoComplete="pincode"
                  defaultValue={pinCode?pinCode:0}
                  error={Boolean(errors.pinCode)}
                  helperText={errors.pinCode?.message}
                  {...register("pinCode", { required: "Enter pin code" })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="State"
                  label="State"
                  type="text"
                  id="State"
                  defaultValue={state?state:""}
                  error={Boolean(errors.state)}
                  helperText={errors.state?.message}
                  {...register("state", { required: "Enter state"})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="District"
                  label="District"
                  type="text"
                  id="District"
                  defaultValue={district?district:""}
                  error={Boolean(errors.district)}
                  helperText={errors.district?.message}
                  {...register("district", { required: "Enter district" })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Subdistrict"
                  label="Subdistrict"
                  type="text"
                  id="Subdistrict"
                  defaultValue={subDistrict?subDistrict:""}
                  error={Boolean(errors.subDistrict)}
                  helperText={errors.subDistrict?.message}
                  {...register("subDistrict", { required: "Enter sub-district" })}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default AddressInfo