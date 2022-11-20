import React from 'react';
import {Button,CssBaseline,TextField,Grid,Box,Typography,Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import {useParams,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const theme = createTheme();

export default function ResetPassword() {
  const { register, handleSubmit,setError, formState: { errors } } = useForm();
  const {token}=useParams();
  const navigate=useNavigate();


  const pageValidate=async()=>{


    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/forgetpassword/validate`, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({token}),
    });

    const response=await res.json()
    if(!response.success){
      toast.error(response.message)
      navigate('/')
    }

  //   //*--------------------------------
  //   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/forgetpassword/validate`,
  //   {token},
  //   { withCredentials: true } // It is use for get the cookies in the response
  // )
  // .catch((error) => {
  //   toast.error(error.response.data.message)
  //       navigate('/')
  // })
  }

  useEffect(()=>{
   pageValidate();
  },[])

  const submit=async(data)=>{
    if (!(data.password === data.confirmpassword)) {
        setError('confirmpassword', { type: 'custom', message: 'Password and comfirm password should be same' });
       return false;
      }

      // send data to api

      
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/resetpassword`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      token,password:data.password
     }),
  });
    //   //------------------------------------
    //   await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/resetpassword`,
    //   {
    //    token,password:data.password
    //   },
    //   { withCredentials: true } // It is use for get the cookies in the response
    // ).then((response)=>{
 const response=await res.json();
 if(response.success){
   toast.success(response.message);
   setTimeout(() => {navigate('/')}, 1000);

 }else{
  toast.error(response.message)
  navigate("/")
 }
            
           

   
    // .catch((error) => {
    //   toast.error(error.response.data.message)
    //   navigate("/")
    // })

    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{margin:"99px auto"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5">
           Password Reset
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="New Password"
              name="newpassword"
              type="password"
              autoFocus
              error={Boolean(errors.password)}
              helperText={errors.password?.message}

            //  react hook form validation
              {...register('password',{required:"Password is required"})}

              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="text"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.confirmpassword)}
              helperText={errors.confirmpassword?.message}
              {...register('confirmpassword',{required:"Password is required"})}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

