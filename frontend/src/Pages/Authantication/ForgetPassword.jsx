import React from 'react';
import {Avatar,Box,Grid,Typography,Container,Link,Button,CssBaseline,TextField} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const theme = createTheme();

export default function ForgetPassword(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submit= async (data)=>{
    
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/forgetpassword/request`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({email:data.email}),
  });
  const response= await res.json();
        if(response.data){
            toast.success(response.message)
        }
        else{
          toast.error(response.message)
        }
  
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
          <Typography component="h2" variant="h6">
            Forget Password
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
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Email
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2"  onClick={()=>{
                    props.setShowWindows("signin")
                }}>
                 Click here to login
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={(e)=>{e.preventDefault(); props.setShowWindows('signup')}} variant="body2">
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

