// components/BookCard.js
import React from "react";
import { styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const StyledCard = styled(Card)`
  margin: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const BookCard = ({ book }) => {
  const { title, author, genre, publishedYear } = book;

  return (
    <StyledCard
      onClick={() => console.log(`Clicked on book: ${book.objectID}`)}
    >
      <CardContent>
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
      </CardContent>
    </StyledCard>
  );
};

export default BookCard;
