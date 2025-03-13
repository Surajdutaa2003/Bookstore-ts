// src/pages/ForgotPassword.tsx
import React from "react";
import { Box, Typography, TextField, Button, Paper, Container } from "@mui/material";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";


const ForgotPassword: React.FC = () => {
  return (
    <>
      <Navbar showSearchAndIcons={false} />
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
          <Typography variant="h5" fontWeight="bold">
            Forgot Your Password?
          </Typography>
          <Paper elevation={3} sx={{ padding: 4, mt: 3, width: "100%" }}>
            <Typography variant="body2" mb={2}>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>
            <TextField fullWidth label="Email Id" variant="outlined" sx={{ mb: 2 }} />
            <Button fullWidth variant="contained" color="error">
              Reset Password
            </Button>
          </Paper>
          <Button sx={{ mt: 2, fontWeight: "bold" }} component={Link} to="/signUp">CREATE ACCOUNT</Button>
        </Box>
      </Container>
    </>
  );
};

export default ForgotPassword;
