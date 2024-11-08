import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import BookCard from "../../components/BookCard";
import BookModal from "../../components/BookModal";

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOpenModal = () => {
    setBookToEdit(null);
    setOpenModal(true);
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Book Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          sx={{ mb: 2 }}
        >
          Create New Book
        </Button>
        {books.map((book) => (
          <BookCard key={book._id} book={book} onEdit={handleEditBook} />
        ))}
        <BookModal
          open={openModal}
          handleClose={handleCloseModal}
          bookToEdit={bookToEdit}
          fetchBooks={fetchBooks}
        />
      </Box>
    </Container>
  );
};

export default BookPage;
