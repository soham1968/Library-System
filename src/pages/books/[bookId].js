import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import connectToDatabase from "@/utils/dbConnect";
import Book from "@/models/book";

const DetailContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 0",
  backgroundColor: "#121212",
  color: "#ffffff",
  borderRadius: "8px",
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
  if (!book) {
    return (
      <DetailContainer>
        <Typography variant="h5">Book not found.</Typography>
      </DetailContainer>
    );
  }

  return (
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
      <Button variant="contained" color="primary">
        Borrow Book
      </Button>
    </DetailContainer>
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
