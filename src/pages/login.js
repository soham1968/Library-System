// pages/login.tsx
import { auth, googleAuthProvider } from "@/utils/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import { Divider, Typography } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  InputField,
  LoginBox,
  PageContainer,
  StyledButton,
  Title,
} from "@/components/LoginPage";
import { useUser } from "@/reducers/UserContext";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Success/Error message
  const [isError, setIsError] = useState(false);
  const { dispatch } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) router.push("/");
    }
  }, []);
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const token = await result.user?.getIdToken();
      const body = {
        firebaseUID: result.user?.uid,
        email: result.user?.email,
        token,
        name: result.user?.displayName,
      };
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setMessage("Log In successful! Redirecting you.");
      setIsError(false);
      dispatch({ type: "SET_USER", payload: data });
      dispatch({ type: "SET_LOADING", payload: false });
      router.push("/");
    } catch (error) {
      console.log(error);
      setMessage("Log In failed. Please try again later");
      setIsError(true);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user?.getIdToken();
      const body = {
        firebaseUID: result.user?.uid,
        email,
        token,
      };
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setMessage("Log In successful! Redirecting you.");
      setIsError(false);
      dispatch({ type: "SET_USER", payload: data });
      dispatch({ type: "SET_LOADING", payload: false });
      router.push("/");
      //TODO Move this to a function and call it both places
    } catch (error) {
      console.log(error);
      setMessage("Log In failed. Please try again later");
      setIsError(true);
    }
  };

  return (
    <PageContainer maxWidth="xs">
      <LoginBox>
        <Title>Login</Title>
        <StyledButton
          color="secondary"
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          fullWidth
        >
          Login with Google
        </StyledButton>
        <Divider sx={{ width: "100%", margin: "1rem 0", color: "#000" }}>
          or
        </Divider>
        <form onSubmit={handleEmailLogin} style={{ width: "100%" }}>
          <InputField
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login with Email
          </StyledButton>
        </form>
      </LoginBox>
      {message && (
        <Typography
          variant="body2"
          align="center"
          color={isError ? "error" : "primary"}
          gutterBottom
          sx={{ marginTop: "1rem", ":hover": { cursor: "pointer" } }}
        >
          {message}
        </Typography>
      )}
    </PageContainer>
  );
};

export default LoginPage;
