import React from "react";
import SearchBar from "@/components/SearchBar";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Head from "next/head";
import { styled } from "@mui/material/styles";
import connectToDatabase from "@/utils/dbConnect";
import book from "@/models/book";
import { NextSeo } from "next-seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HeroSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "60vh",
  backgroundColor: "#123456", // Customize the color
  color: "#fff",
  textAlign: "center",
  padding: "2rem",
});

const PlaceholderSection = styled(Box)({
  padding: "2rem",
});

const CardContainer = styled(Grid)({
  marginTop: "2rem",
});

const FAQAccordion = styled(Box)({
  marginTop: "2rem",
});

export default function Home({ featuredBooks }) {
  return (
    <>
      <NextSeo
        title="Home - Library Management System"
        description="Welcome to our Library Management System. Discover and rent your favorite books easily."
      />
      <Navbar />
      <Container sx={{ minHeight: "100vh" }}>
        <HeroSection>
          <Typography variant="h2" gutterBottom>
            Welcome to Our Book Store
          </Typography>
          <Typography variant="h6">
            Discover and rent your favorite books easily
          </Typography>
        </HeroSection>

        <SearchBar />

        <PlaceholderSection>
          <Typography variant="h4" gutterBottom>
            Featured Books
          </Typography>
          <CardContainer container spacing={4}>
            {/* Placeholder for Cards */}
            {featuredBooks?.map((book, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ background: "#fff" }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      By {book.author}
                    </Typography>
                    <Typography variant="body1">{book.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </CardContainer>
        </PlaceholderSection>

        <FAQAccordion>
          <Typography variant="h4" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Accordion sx={{ background: "#fff" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>How do I rent a book?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To rent a book, simply browse our collection, select your
                desired book, and click on the &quot;Rent&quot; button. Follow
                the prompts to complete the rental process.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ background: "#fff" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What is the rental duration?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                The standard rental duration is 7 days. You can extend the
                rental period by contacting our support team.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ background: "#fff" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>What if the book I want is not available?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                If the book you want is not available, you can join the waitlist
                and we will notify you once it becomes available.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </FAQAccordion>
        <Footer />
      </Container>
    </>
  );
}
export const getServerSideProps = async () => {
  await connectToDatabase();
  const featuredBooks = await book.find({}).limit(5);
  return {
    props: {
      featuredBooks: JSON.parse(JSON.stringify(featuredBooks)),
    },
  };
};
