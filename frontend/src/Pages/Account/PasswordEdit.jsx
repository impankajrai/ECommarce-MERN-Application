import {Button,Avatar,CssBaseline,TextField,Link,Grid,Box,Typography,Container} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const theme = createTheme();

function PasswordEdit({setopen}) {
  const {register,setError,handleSubmit,formState: { errors }} = useForm();

    const submit = async (data) => {
      if (!(data.password === data.confirmpassword)) {
        setError('confirmpassword', { type: 'custom', message: 'Password and comfirm password should be same' });
       return false;
      }

       let response = await fetch(
         `${process.env.REACT_APP_BACKEND_URL}/user/updatepassword`,
         {
           method: "post",
           credentials: "include",
           headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
           },
           body: JSON.stringify({newPassword:data.password,oldPassword:data.currentpwd }),
         });

         response= await response.json()
         if (response.success) {
          toast.success(response.message)
          setopen(false)
         }else{
          toast.error(response.message)
         }
        
      };

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submit)} 
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  id="CurrentPwd"
                  label="Current Password"
                  name="currentpwd"
                  autoComplete="CurrentPwd"
                  error={Boolean(errors.currentpwd)}
                  helperText={errors.currentpwd?.message}
                  {...register("currentpwd", { required: "Enter old password" })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  {...register("password", { required: "Enter new password" })}
              
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm New Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  error={Boolean(errors.confirmpassword)}
                  helperText={errors.confirmpassword?.message}
                  {...register("confirmpassword", {
                    required: "Enter confirm password",
                  })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={(e)=>{e.preventDefault(); }} variant="body2">
                 Forget Password ?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default PasswordEdit