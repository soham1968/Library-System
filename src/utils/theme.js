import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000", // Black background
      paper: "#121212", // Slightly lighter black for paper elements
    },
    text: {
      primary: "#000", // White text
      secondary: "#000", // Light grey text for secondary elements
    },
    primary: {
      main: "#90caf9", // Light blue for primary color
    },
    secondary: {
      main: "#f48fb1", // Pink for secondary color
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)", // Natural shadow
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1)", // Natural shadow for cards
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Natural shadow for buttons
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // Slight shadow for text fields
        },
      },
    },
  },
});

export default theme;
