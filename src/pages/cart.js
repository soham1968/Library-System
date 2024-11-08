import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const CartContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 0",
  backgroundColor: "#121212",
  color: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
});

const CartBox = styled(Box)({
  maxWidth: "800px",
  width: "100%",
  padding: "1rem",
  backgroundColor: "#1f1f1f",
  borderRadius: "8px",
  marginBottom: "1rem",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
});

const Cart = ({ cartItems }) => {
  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <Typography variant="h5">Your cart is empty.</Typography>
        <Link href="/">
          <Button variant="contained" color="primary">
            Go to Books
          </Button>
        </Link>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartBox>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.bookId} divider>
              <ListItemText
                primary={item.title}
                secondary={`Author: ${item.author} | Quantity: ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
      </CartBox>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Proceed to Checkout
      </Button>
    </CartContainer>
  );
};

Cart.getInitialProps = async (ctx) => {
  const cartItems = [
    {
      bookId: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      quantity: 1,
    },
    // Add more sample items if needed
  ];

  return {
    cartItems,
  };
};

export default Cart;
