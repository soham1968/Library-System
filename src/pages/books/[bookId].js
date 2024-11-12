import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import connectToDatabase from "@/utils/dbConnect";
import Book from "@/models/book";
import { useUser } from "@/reducers/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextSeo } from "next-seo";

const DetailContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 0",
  backgroundColor: "#121212",
  color: "#ffffff",
  borderRadius: "8px",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
});

const DetailBox = styled(Box)({
  maxWidth: "600px",
  width: "100%",
  padding: "1rem",
  backgroundColor: "#1f1f1f",
  borderRadius: "8px",
  marginBottom: "1rem",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
});

const BookDetail = ({ book }) => {
  const { state } = useUser();
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const addToCart = async () => {
    if (state.user) {
      try {
        const body = {
          cart: [{ book: book._id }],
          firebaseUID: state.user.firebaseUID,
          token,
        };
        const response = await fetch("/api/user/cart/add", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        setSnackbarOpen(true);
        if (response.status !== 200) {
          const errorData = await response.json();
          setSnackbarSeverity("error");
          setSnackbarMessage(data.message || "Can't add to cart");
          return;
        }

        const data = await response.json();
        dispatch({ type: "SET_USER", payload: data });
        setSnackbarSeverity("success");
        setSnackbarMessage("Added to cart!");
      } catch (error) {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(data.message || "Can't add to cart");
      }
    }
  };
  if (!book) {
    return (
      <DetailContainer>
        <Typography variant="h5">Book not found.</Typography>
      </DetailContainer>
    );
  }
  const isInCart = state?.user?.cart?.some((items) => items.book === book._id);
  return (
    <>
      <NextSeo
        title={`${book.title} by ${book.author} - Library Management System`}
        description="Welcome to our Library Management System. Discover and rent your favorite books easily."
      />
      <Navbar />
      <DetailContainer>
        <DetailBox>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Author: {book.author}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Genre: {book.genre}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Published Year: {book.publishedYear}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description: {book.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Available Copies: {book.availableCopies}
          </Typography>
        </DetailBox>
        <Button
          sx={{ width: "100%" }}
          onClick={() => addToCart()}
          variant="contained"
          color="error"
          disabled={isInCart}
        >
          {isInCart ? "Already in Cart" : "Borrow Book"}
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
      </DetailContainer>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  await connectToDatabase();
  const { bookId } = context.params;
  const book = await Book.findById(bookId).lean();

  return {
    props: {
      book: book ? JSON.parse(JSON.stringify(book)) : null,
    },
  };
}

export default BookDetail;
