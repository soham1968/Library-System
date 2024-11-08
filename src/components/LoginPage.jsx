// styles/LoginPage.tsx
import styled from "@emotion/styled";
import { Button, TextField, Typography, Container, Box } from "@mui/material";

export const PageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

export const LoginBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled(Typography)`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
`;

export const InputField = styled(TextField)`
  margin-bottom: 1rem;
`;

export const StyledButton = styled(Button)`
  margin-top: 1rem;
`;
