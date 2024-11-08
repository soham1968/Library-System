import { UserProvider } from "@/reducers/UserContext";
import "@/styles/globals.css";
import theme from "@/utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <CssBaseline />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
