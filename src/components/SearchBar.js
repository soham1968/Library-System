// components/SearchBar.js
import React, { useState } from "react";
import { searchBooks } from "../utils/algolia";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle search input changes
  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchResults = await searchBooks(searchQuery);
    setResults(searchResults);
    setLoading(false);
  };

  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearch}
      />
      {loading ? (
        <CircularProgress style={{ marginTop: "10px" }} />
      ) : (
        <List>
          {results.map((result) => (
            <ListItem button key={result.objectID}>
              <ListItemText
                primary={result.title}
                secondary={`Author: ${result.author}, Genre: ${result.genre}, Published Year: ${result.publishedYear}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SearchBar;
