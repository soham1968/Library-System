// pages/login.tsx
import { auth, googleAuthProvider } from "@/utils/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import { Divider } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import {
  InputField,
  LoginBox,
  PageContainer,
  StyledButton,
  Title,
} from "../components/LoginPage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleLogin = async () => {
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
    console.log(response);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
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
    console.log(response);
  };

  return (
    <PageContainer maxWidth="xs">
      <LoginBox>
        <Title>Login</Title>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          fullWidth
        >
          Login with Google
        </StyledButton>
        <Divider sx={{ width: "100%", margin: "1rem 0" }}>or</Divider>
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
    </PageContainer>
  );
};

export default LoginPage;
