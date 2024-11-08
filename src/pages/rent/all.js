import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import connectToDatabase from "@/utils/dbConnect";
import rent from "@/models/rent";
import User from "@/models/user";
import Navbar from "@/components/Navbar";

const RentContainer = styled(Container)({
  padding: "2rem 0",
});

const RentCard = styled(Card)({
  marginBottom: "1rem",
  background: "#fff",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
});

const Rents = ({ rents }) => {
  return (
    <>
      <Navbar />
      <RentContainer maxWidth="md">
        <Typography variant="h4" gutterBottom>
          All Rents
        </Typography>
        <Grid container spacing={4}>
          {rents.map((rent) => (
            <Grid item xs={12} sm={6} md={4} key={rent._id}>
              <RentCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    User: {rent.user}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Rented At: {new Date(rent.rentedAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Return Date: {new Date(rent.returnDate).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Status: {rent.status}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Books:
                  </Typography>
                  <ul>
                    {rent.books.map((book) => (
                      <li key={book._id}>
                        <Typography variant="body2">
                          {book.title} by {book.author}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </RentCard>
            </Grid>
          ))}
        </Grid>
      </RentContainer>
    </>
  );
};

export async function getServerSideProps() {
  await connectToDatabase();

  const rents = await rent.find({}).populate("books").lean();

  // Fetch user names
  const rentsWithUserNames = await Promise.all(
    rents.map(async (rent) => {
      const user = await User.findById(rent.user).lean();
      return {
        ...rent,
        _id: rent._id.toString(),
        user: user ? user.name : "Unknown User",
        rentedAt: rent.rentedAt.toString(),
        returnDate: rent.returnDate.toString(),
      };
    })
  );

  return {
    props: {
      rents: JSON.parse(JSON.stringify(rentsWithUserNames)),
    },
  };
}

export default Rents;
