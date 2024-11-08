import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import { useUser } from "@/reducers/UserContext";
import { useRouter } from "next/router";
import { Security } from "@mui/icons-material";

const NavbarContainer = styled(AppBar)({
  backgroundColor: "#123456", // Customize as needed
  color: "#ffffff",
  position: "fixed",
  top: 0,
  zIndex: 1000, // Make sure the navbar stays above other components
});

const Navbar = () => {
  const { state } = useUser();
  const { user } = state;
  const router = useRouter();
  const cartItemCount = user?.cart?.length || 0;

  return (
    <NavbarContainer position="static">
      <Toolbar>
        <Typography
          onClick={() => router?.push("/")}
          variant="h6"
          sx={{ flexGrow: 1, ":hover": { cursor: "pointer" } }}
        >
          Library Management System
        </Typography>
        <IconButton onClick={() => router?.push("/cart")} color="inherit">
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {user?.email ? (
          <Avatar>{user?.name?.charAt(0) || user?.email.charAt(0)}</Avatar>
        ) : (
          <IconButton onClick={() => router?.push("/signup")}>
            <Security />
          </IconButton>
        )}
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
