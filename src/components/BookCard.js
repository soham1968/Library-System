import React from "react";
import styled from "@emotion/styled";
import { Card, CardContent, Typography, Button } from "@mui/material";

const StyledCard = styled(Card)`
  margin: 1rem 0;
`;

const BookCard = ({ book, onEdit }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="body2">Author: {book.author}</Typography>
        <Typography variant="body2">Genre: {book.genre}</Typography>
        <Typography variant="body2">
          Published Year: {book.publishedYear}
        </Typography>
        <Typography variant="body2">
          Available Copies: {book.availableCopies}
        </Typography>
        <Button variant="outlined" color="primary" onClick={() => onEdit(book)}>
          Edit
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default BookCard;
