import { Box, Divider, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { MainContainer, Heading, ProfilePhotoWithName, Container, SubHeading, Information} from "./style";
import PersonalInfo from "./PersonalInfo";
import Popup from "../../Components/Popup";
import AddressInfo from "./AddressInfo";
import { useSelector } from "react-redux";



function Profile() {
  const [personalInfoShow, setPersonalInfoShow] = useState(false);
  const [addrInfoShow, setAddrInfoShow] = useState(false);
  const userData=useSelector((globalstate)=>globalstate.user)

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
        <MainContainer
          gridColumn="span 3"
          gridRow="span 3"
          h="80vh"
          marginY="4vh"
        >
          <Heading margin="15px auto" fontSize="24px">
            Profile
          </Heading>
          <ProfilePhotoWithName>
            <img
              src={userData.photo}
              alt="profilepic"
              draggable="false"
            />
            <p style={{textTransform:"capitalize"}}>{userData?.name}</p>
          </ProfilePhotoWithName>
          <Divider variant="middle" />
          <Container>
            <SubHeading>Customer Id</SubHeading>
            <Information>{userData?.id}</Information>

            <SubHeading>Mobile</SubHeading>
            <Information>{userData?.mobile?userData.mobile:"xxxxxxxxxxxx"}</Information>

            <SubHeading>Email</SubHeading>
            <Information>{userData?.email}</Information>
          </Container>
        </MainContainer>

        {/* Second Container and personal Information section start */}
        <MainContainer gridColumn="span 8" h="31vh" marginTop="4vh">
          <Heading  margin="10px 15px">Personal Information</Heading>

          <Box display="flex" marginX="50px">
            <Box width="50%">
              <SubHeading>Name </SubHeading>
              <Information>{userData?.name}</Information>
            </Box>
            <Box width="50%">
              <SubHeading>User Id </SubHeading>
              <Information>w265dd154e11541</Information>
            </Box>
          </Box>

          <Box display="flex" marginX="50px">
            <Box width="50%">
              <SubHeading>Gender </SubHeading>
              <Information>{userData?.gender ? userData.gender : "Male/Female"}</Information>
            </Box>
            <Box width="50%">
              <SubHeading>Email</SubHeading>
              <Information>{userData?.email}</Information>
            </Box>
          </Box>
          <Button
            style={{ position: "absolute" }}
            variant="contained"
            endIcon={<EditIcon />}
            size="small"
            onClick={() => setPersonalInfoShow(true)}
          >
            Edit
          </Button>
        </MainContainer>

        {/* Address information section start */}
        <MainContainer gridColumn="span 8" h="48vh">
          <Heading margin="10px 15px">Address Information</Heading>

          <Box display="flex" marginX="50px">
            <Box width="50%">
              <SubHeading>Line 1</SubHeading>
              <Information>{userData?.address?.line1?userData.address.line1:"-"}</Information>
            </Box>
            <Box width="50%">
              <SubHeading>Line 2</SubHeading>
              <Information>{userData?.address?.line2?userData.address.line2:"-"}</Information>
            </Box>
          </Box>

          <Box display="flex" marginX="50px">
            <Box width="50%">
              <SubHeading>House Number</SubHeading>
              <Information>{userData?.address?.houseNumber?userData.address.houseNumber:"-"}</Information>
            </Box>
            <Box width="50%">
              <SubHeading>Land Mark</SubHeading>
              <Information>{userData?.address?.landmark?userData.address.landmark:"-"}</Information>
            </Box>
          </Box>

          <Box display="flex" marginX="50px">
            <Box width="50%">
              <SubHeading>Area Pin Code</SubHeading>
              <Information>{userData?.address?.pincode?userData.address.pincode:"-"}</Information>
            </Box>
            <Box width="50%">
              <SubHeading>State</SubHeading>
              <Information>{userData?.address?.state?userData.address.state:"-"}</Information>
            </Box>
          </Box>
          
          <Box display="flex" marginX="50px">
            <Box width="50%">
              <SubHeading>District</SubHeading>
              <Information>{userData?.address?.district?userData.address.district:"-"}</Information>
            </Box>
            <Box width="50%">
              <SubHeading>Subdistrict</SubHeading>
              <Information>{userData?.address?.subDistrict?userData.address.subDistrict:"-"}</Information>
            </Box>
          </Box>

          <Button
            style={{ position: "absolute" }}
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => setAddrInfoShow(true)}
            size="small"
          >
            Edit
          </Button>
        </MainContainer>

      </Box>

      
        {/* popups */}
        <Popup open={personalInfoShow} setopen={setPersonalInfoShow}>
          <PersonalInfo />
        </Popup>

        <Popup open={addrInfoShow} setopen={setAddrInfoShow}>
          <AddressInfo />
        </Popup>
    </>
  );
}

export default Profile;
