// pages/login.tsx
import React from "react";
import {
  PageContainer,
  LoginBox,
  Title,
  InputField,
  StyledButton,
} from "../styles/LoginPage";
import { Button, Divider, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/utils/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGoogleLogin = async () => {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const token = await result.user?.getIdToken();
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const result = await signInWithEmailAndPassword(auth, email, password);
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
