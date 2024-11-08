// pages/signup.tsx
import { useState } from "react";
import {
  InputField,
  PageContainer,
  SignUpBox,
  StyledButton,
  Title,
} from "../components/SignUpPage";

import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Typography } from "@mui/material";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(""); // Success/Error message
  const [isError, setIsError] = useState(false); // Message state
  const isValid = name.length > 0 && email.length > 0 && password.length > 0;
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await result.user?.getIdToken();
      const body = {
        firebaseUID: result.user?.uid,
        name,
        email,
        mobile: phoneNumber,
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

      // Use the token as needed
      console.log("Email sign-up successful:", data);
      setMessage("Sign up successful! Welcome aboard.");
      setIsError(false);
    } catch (error) {
      setMessage(
        "Sign up failed. Please try again. If Already signed up Please log in."
      );
      setIsError(true);
    }
  };

  return (
    <PageContainer maxWidth="xs">
      <SignUpBox>
        <Title>Sign Up</Title>
        <Typography variant="body1" align="center" gutterBottom>
          Create your account to get started. Please fill in your details below.
        </Typography>
        <form onSubmit={handleEmailSignUp} style={{ width: "100%" }}>
          <InputField
            variant="outlined"
            label="Name"
            type="text"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <InputField
            variant="outlined"
            label="Phone Number"
            type="tel"
            fullWidth
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isValid}
          >
            Sign up
          </StyledButton>
        </form>
        {message && (
          <Typography
            variant="body2"
            align="center"
            color={isError ? "error" : "primary"}
            gutterBottom
            sx={{ marginTop: "1rem" }}
          >
            {message}
          </Typography>
        )}
      </SignUpBox>
    </PageContainer>
  );
};

export default SignUpPage;