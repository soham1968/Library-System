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
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const { user } = state;
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const router = useRouter();

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

  const handleCheckout = async () => {
    if (user) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`/api/rent/${user._id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookIds: cartItems.map((item) => item.bookId),
            token,
            rentalDuration: 7,
          }),
        });
        const data = await response.json();
        dispatch({ type: "SET_USER", payload: data.updatedUser });
        if (response.status === 200) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Checkout successful!");
          router.push(`/orderstatus/${data.rent._id}`);
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage(data.message || "Checkout failed");
        }
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Something went wrong during checkout");
      } finally {
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (!loading && cartItems.length === 0) {
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
          {cartItems.map((item) => (
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </CartContainer>
  );
};

export default Cart;
