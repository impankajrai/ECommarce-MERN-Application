import React from "react";
import Box from "@mui/material/Box";
import { FooterContainer, InnerContainer, List } from "./Style";

function Footer() {
  return (
    <FooterContainer>
      <InnerContainer>
        <Box>
          <List>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </List>
        </Box>
        <Box>
          <List>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </List>
        </Box>
        <Box>
          <List>
            <li>About</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </List>
        </Box>
      </InnerContainer>

      <p style={{margin:'20px auto' }}>All right reserved @ Ecom.in demo</p>
      </FooterContainer>
    
  );
}

export default Footer;
