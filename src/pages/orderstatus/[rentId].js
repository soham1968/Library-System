import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Rent from "@/models/rent";
// import books from "@/models/book";
import connectToDatabase from "@/utils/dbConnect";

const OrderStatusContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 0",
  backgroundColor: "#121212",
  color: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
});

const OrderStatusBox = styled(Box)({
  maxWidth: "800px",
  width: "100%",
  padding: "1rem",
  backgroundColor: "#1f1f1f",
  borderRadius: "8px",
  marginBottom: "1rem",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)",
});

const OrderStatus = ({ rent }) => {
  if (!rent) {
    return (
      <OrderStatusContainer>
        <Typography variant="h5">Order not found.</Typography>
      </OrderStatusContainer>
    );
  }

  return (
    <OrderStatusContainer>
      <OrderStatusBox>
        <Typography variant="h4" gutterBottom>
          Order Status
        </Typography>
        <Typography variant="h6" gutterBottom>
          Rented At: {new Date(rent.rentedAt).toLocaleString()}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Return Date: {new Date(rent.returnDate).toLocaleString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Status: {rent.status}
        </Typography>
        <List>
          {rent.books.map((book) => (
            <ListItem key={book._id} divider>
              <ListItemText
                primary={book.title}
                secondary={`Author: ${book.author}`}
              />
            </ListItem>
          ))}
        </List>
      </OrderStatusBox>
    </OrderStatusContainer>
  );
};

export async function getServerSideProps(context) {
  await connectToDatabase();
  const { rentId } = context.params;

  try {
    const rent = await Rent.findById(rentId).populate("books").lean();
    if (!rent) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        rent: JSON.parse(JSON.stringify(rent)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default OrderStatus;
