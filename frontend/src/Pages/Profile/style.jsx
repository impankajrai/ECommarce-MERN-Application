import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const MainContainer = styled(Box)(({ h }) => ({
  backgroundColor: "white",
  boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  height: h,
  marginY: "5vh",
  marginLeft: "4vw",
  borderRadius: "4px",
  position: "relative",

  Button: {
    width: "100px",
    position: "absulate",
    right: "15px",
    bottom: "15px",
  },
}));

export const Heading = styled("h3")(({ margin, fontSize }) => ({
  margin,
  fontSize,
  boxSizing: "border-box",
}));

export const ProfilePhotoWithName = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  boxShadow: "initial",
  margin: "20px auto",
  img: {
    borderRadius: "50%",
    margin: "20px auto",
    width: "150px",
  },
  p: {
    margin: "0 auto",
    fontWeight: "bold",
  },
});

export const Container = styled("div")({
  // border:'1px solid black',
  boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
  borderRadius: "5px",
  padding: "10px",
  height: "100%",
});
export const SubHeading = styled("h5")({
  margin: "5px 15px",
  marginTop: "15px",
});

export const Information = styled("p")({
  margin: "5px 15px",
  color: "darkgray",
});

//personal info css

export const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const FileUploadContainer = styled(Box)({
  height: "115px",
  border: "1px solid darkgray",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: "7px",
  position: "relative",
});

export const FileUploadLabel = styled("label")({
  position: "absolute",
  top: "-12px",
  left: "9px",
  color: "gray",
  background: "white",
  padding: "0 4px",
  fontSize: "14px",
});


export const Preview = styled("img")({
  height:"100px",borderRadius:"50%"
  });
