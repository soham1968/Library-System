import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Box)({
  backgroundColor: "#123456", // Customize as needed
  color: "#ffffff",
  padding: "1rem 0",
  margin: "16px 0",
  width: "100%",
  textAlign: "center",
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Typography variant="body1">
          Thank you for visiting our Library Management System.
        </Typography>
        <Typography variant="body2">
          © {new Date().getFullYear()} Library Management System. All rights
          reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
