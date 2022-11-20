import * as React from "react";
import {CssBaseline,Container,Paper,Stepper,Step,StepLabel,Typography} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const steps = ["Shipping address", "Review your order", "Payment details"];

function getStepContent(step, handleNext,handleBack) {
  switch (step) {
    case 0:
      return <AddressForm handleNext={handleNext}/>;
      case 1:
      return <Review handleBack={handleBack} handleNext={handleNext} />;
      case 2:
        return <PaymentForm handleBack={handleBack}  />;
        default:
          throw new Error("Unknown step");
        }
      }
      
      const theme = createTheme();
      
      export default function Checkout() {
        const [activeStep, setActiveStep] = useState(0);
        const navigate=useNavigate();
        const product=useSelector((globalState)=>globalState.order.products)
        
        useEffect(()=>{
          if (!product.length){
            navigate(-1)
            toast.error("Please Order Again")
          }

        },[])
        
        const handleNext = () => {
          setActiveStep(activeStep + 1);
        };
        
        const handleBack = () => {
          setActiveStep(activeStep - 1);
        };
        
        return (
          <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep, handleNext,handleBack)}

        </Paper>
      </Container>
    </ThemeProvider>
  );
}
