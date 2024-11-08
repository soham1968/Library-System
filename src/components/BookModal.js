import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-height: 80vh; // Set a max height
  background-color: white;
  box-shadow: 24px;
  padding: 2rem;
  overflow-y: auto; // Enable vertical scrolling
`;

const BookModal = ({ open, handleClose, bookToEdit, fetchBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setGenre(bookToEdit.genre);
      setPublishedYear(bookToEdit.publishedYear);
      setDescription(bookToEdit.description);
      setTotalCopies(bookToEdit.totalCopies);
      setAvailableCopies(bookToEdit.availableCopies);
      setIsEditMode(true);
    } else {
      resetFields();
      setIsEditMode(false);
    }
  }, [bookToEdit]);

  const resetFields = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublishedYear("");
    setDescription("");
    setTotalCopies("");
    setAvailableCopies("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await axios.put("/api/books/update", {
          id: bookToEdit._id,
          title,
          author,
          genre,
          publishedYear,
          description,
          totalCopies,
          availableCopies,
        });
      } else {
        await axios.post("/api/books/create", {
          title,
          author,
          genre,
          publishedYear,
          description,
          totalCopies,
          availableCopies,
        });
      }
      fetchBooks();
      handleClose();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const isFormValid = () => {
    return (
      title &&
      author &&
      totalCopies > 0 &&
      availableCopies > 0 &&
      !isNaN(publishedYear) &&
      !isNaN(totalCopies) &&
      !isNaN(availableCopies)
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Typography variant="h6" component="h2" gutterBottom>
          {isEditMode ? "Edit Book" : "Create Book"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            variant="outlined"
            label="Author"
            fullWidth
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            margin="normal"
          />
          <TextField
            variant="outlined"
            label="Genre"
            fullWidth
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            margin="normal"
          />
          <TextField
            variant="outlined"
            label="Published Year"
            fullWidth
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            margin="normal"
          />
          <TextField
            variant="outlined"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            variant="outlined"
            label="Total Copies"
            fullWidth
            type="number"
            required
            value={totalCopies}
            onChange={(e) => setTotalCopies(e.target.value)}
            margin="normal"
          />
          <TextField
            variant="outlined"
            label="Available Copies"
            fullWidth
            type="number"
            required
            value={availableCopies}
            onChange={(e) => setAvailableCopies(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isFormValid()}
            sx={{ mt: 2 }}
          >
            {isEditMode ? "Update" : "Create"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleClose}
            sx={{ mt: 1 }}
          >
            Close
          </Button>
        </form>
      </ModalBox>
    </Modal>
  );
};

export default BookModal;
