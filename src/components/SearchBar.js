// components/SearchBar.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { searchBooks } from "../utils/algolia";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material";

const SearchContainer = styled("div")({
  width: "100%",
  height: "100%",
  margin: "0 auto",
  position: "relative",
});
const SearchBox = styled("div")({
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
  borderRadius: 4,
  padding: 8,
  backgroundColor: "#f9f9f9",
});
const SuggestionList = styled(List)({
  border: "1px solid #ddd",
  borderRadius: 4,
  marginTop: 10,
  maxHeight: 200,
  overflowY: "auto",
  backgroundColor: "white",
  position: "absolute",
  width: "100%",
  zIndex: 1000,
});

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle search input changes
  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    const searchResults = await searchBooks(searchQuery);
    setSuggestions(searchResults);
    setLoading(false);
  };

  // Function to handle search icon click
  const handleSearchIconClick = () => {
    if (query.trim() === "") return;
    router.push(`/results?query=${query}`);
  };

  return (
    <SearchContainer>
      <SearchBox>
        <TextField
          label="Search Books"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleSearch}
        />
        <IconButton onClick={handleSearchIconClick}>
          <SearchIcon sx={{ color: "#000" }} />
        </IconButton>
      </SearchBox>

      {loading ? (
        <CircularProgress style={{ marginTop: "10px" }} />
      ) : suggestions.length > 0 ? (
        <SuggestionList>
          {suggestions.map((suggestion) => (
            <ListItem
              onClick={() => router.push(`/books/${suggestion._id}`)}
              button
              sx={{ ":hover": { cursor: "pointer", border: "1px solid #000" } }}
              key={suggestion.objectID}
            >
              <ListItemText sx={{ color: "#000" }} primary={suggestion.title} />
            </ListItem>
          ))}
        </SuggestionList>
      ) : null}
    </SearchContainer>
  );
};

export default SearchBar;
