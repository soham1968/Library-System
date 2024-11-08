import { UserProvider } from "@/reducers/UserContext";
import "@/styles/globals.css";
import theme from "@/utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
