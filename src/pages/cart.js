import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useUser } from "@/reducers/UserContext";

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

const Cart = () => {
  const { state, dispatch } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = state;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `/api/user/cart?firebaseUID=${user.firebaseUID}&token=${token}`
          );
          const data = await response.json();
          if (response.status === 200) {
            setCartItems(data);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
        setLoading(false);
      }
    };
    if (user && loading) {
      fetchCartItems();
    }
  }, [user, loading]);
  if (!loading && user?.cart.length === 0) {
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
  if (loading) {
    return (
      <CartContainer>
        <CircularProgress />
        <Typography variant="h5">Loading...</Typography>
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
          {cartItems?.map((item) => (
            <ListItem sx={{ background: "#fff" }} key={item.bookId} divider>
              <ListItemText
                primary={item.title}
                sx={{ color: "#121212" }}
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

export default Cart;
