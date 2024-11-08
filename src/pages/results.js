// pages/results.js
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { searchBooks } from "../utils/algolia";
import CircularProgress from "@mui/material/CircularProgress";
import BookCard from "../components/BookCard";
import { styled } from "@mui/material";

const ResultsContainer = styled("div")`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Results = () => {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const observer = useRef();

  // Function to fetch books with pagination
  const fetchBooks = async (query, page) => {
    setLoading(true);
    const newResults = await searchBooks(query, page);
    setResults((prevResults) => [...prevResults, ...newResults]);
    setLoading(false);
  };

  // Use Intersection Observer to detect when reaching the end of the list
  const lastBookElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  // Fetch initial results and update on query/page changes
  useEffect(() => {
    if (query) {
      setResults([]);
      setPage(0);
      fetchBooks(query, 0);
    }
  }, [query]);

  useEffect(() => {
    if (page > 0) fetchBooks(query, page);
  }, [page]);

  return (
    <ResultsContainer>
      <h1>Search Results for: {query}</h1>
      {results.map((result, index) => (
        <div
          key={result.objectID}
          ref={index === results.length - 1 ? lastBookElementRef : null}
        >
          <BookCard book={result} />
        </div>
      ))}
      {loading && (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      )}
    </ResultsContainer>
  );
};

export default Results;
