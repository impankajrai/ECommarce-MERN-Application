import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Container,Typography,Box,Grid,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Avatar,Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux'
import { login } from '../../Redux/Slices/authanticationSlice';
import { getCartData } from '../../Redux/Slices/cartSlice';
import { getWishlistData } from '../../Redux/Slices/wishlistSlice';

const theme = createTheme();

export default function SignIn(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch=useDispatch();
  
  const submit=async(data)=>{
    await dispatch(login({email:data.email,password:data.password}))
     dispatch(getCartData())
    dispatch(getWishlistData())
}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email)}
              helperText={errors.email?.message}

            //  react hook form validation
              {...register('email',{required:"Email is required",pattern:{
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                
              }})}

              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...register('password',{required:"Password is required"})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              name='remember'
              {...register('remember')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" onClick={(e)=>{
                    e.preventDefault();
                    props.setShowWindows("forgetpassword")
                }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={(e)=>{e.preventDefault(); props.setShowWindows("signup")}} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

