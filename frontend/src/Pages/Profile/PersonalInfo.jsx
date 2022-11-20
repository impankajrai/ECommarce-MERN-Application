import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Radio,RadioGroup,Grid,FormLabel,Box,Typography,Container,FormHelperText,} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUser } from "../../Redux/Slices/authanticationSlice";
import { FileUploadContainer, FileUploadLabel, FormContainer, Preview } from "./style";

const theme = createTheme();

function PersonalInfo() {
  const [img, setImg] = useState();
  const user = useSelector((globalState) => globalState.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onsubmit = async (data) => {

    data={...data,photo:data.photo[0]}
    const formData=new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
   }

    dispatch(updateUser(formData))

  };

  const onImageChange=(e)=>{
    const [file]=e.target.files
    setImg(URL.createObjectURL(file));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormContainer>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Personal Information
          </Typography>

          <Box
            component="form"
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onsubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FileUploadContainer>
                  <FileUploadLabel> Profile Picture</FileUploadLabel>
                  <input type="file" {...register("photo")} accept="image/*" onChange={onImageChange}/>

                  <Preview
                    src={img||user.photo}
                    alt="profilepic"
                  />
                </FileUploadContainer>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  required
                  defaultValue={user?.name}
                  fullWidth
                  label="Name"
                  autoFocus
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName?.message}
                  {...register("fullName", { required: "Enter first name" })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  defaultValue={user?.email}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  id="mobile"
                  type="tel"
                  error={Boolean(errors.mobile)}
                  defaultValue={user?.mobile}
                  helperText={errors.mobile?.message}
                  {...register("mobile")}
                />
              </Grid>

              <Grid marginLeft="20px" marginTop="20px">
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  id="gender"
                  error={Boolean(errors.gender)}
                  defaultValue={user?.gender}
                  helperText={errors.gender?.message}
                  {...register("gender", { required: "Select gender" })}
                >
                  <FormControlLabel
                    name="gender"
                    value="Female"
                    control={<Radio />}
                    label="Female"
                    {...register("gender")}
                  />
                  <FormControlLabel
                    name="gender"
                    value="Male"
                    control={<Radio />}
                    label="Male"
                    {...register("gender")}
                  />
                  <FormControlLabel
                    name="gender"
                    value="Other"
                    control={<Radio />}
                    label="Other"
                    {...register("gender")}
                  />
                </RadioGroup>
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.gender?.message}
                </FormHelperText>
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
        </FormContainer>
      </Container>
    </ThemeProvider>
  );
}

export default PersonalInfo;
