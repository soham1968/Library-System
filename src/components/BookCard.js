// components/BookCard.js
import React, { useState } from "react";
import { Alert, Button, CardActions, Snackbar, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useUser } from "@/reducers/UserContext";

const StyledCard = styled(Card)`
  margin: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  background-color: #fff;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }
`;

const BookCard = ({ book }) => {
  const { title, author, genre, publishedYear, _id, description } = book;
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { state, dispatch } = useUser();
  const token = localStorage.getItem("token");
  const addToCart = async () => {
    console.log(state);
    if (state.user) {
      try {
        const body = {
          cart: [{ book: _id }],
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
        if (response.status !== 200) {
          const errorData = await response.json();
          setSnackbarMessage(errorData.message || "Something went wrong");
          setSuccess(false);
          return;
        }
        const data = await response.json();
        dispatch({ type: "SET_USER", payload: data });
        setSnackbarMessage("Book added to cart successfully");
        setSuccess(true);
      } catch (error) {
        setSnackbarMessage(
          "Something went wrong or the book has already been added to the cart"
        );
        setSuccess(false);
      }
    }
  };

  return (
    <>
      <StyledCard>
        <CardContent onClick={() => router.push(`/books/${_id}`)}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genre: {genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Published Year: {publishedYear}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => addToCart()} variant="outlined" color="error">
            Add To Cart
          </Button>
        </CardActions>
        {snackbarMessage.length > 0 && (
          <Typography
            px={2}
            py={1}
            fontWeight={400}
            color={success ? "success" : "error"}
          >
            {snackbarMessage}
          </Typography>
        )}
      </StyledCard>
    </>
  );
};

export default BookCard;
