import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const validate = () => {
    const error = {};
    if (!formFields.username) error.username = "Username is required!";
    if (!formFields.password) error.password = "Password is required!";
    setError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        username: formFields.username,
        password: formFields.password,
      };

      try {
        const response = await axios.post(
          "http://localhost:8080/account/login",
          formData
        );
        if (response.data.status === "success" && response.data.data) {
          sessionStorage.setItem(
            "userdata",
            JSON.stringify(response.data.data)
          );
          handleClear();
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error User login:", error);
      }
    }
  };

  const handleClear = () => {
    setFormFields({ username: "", password: "" });
    setError({});
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              size="small"
              value={formFields.username}
              onChange={handleChange}
              error={Boolean(error.username)}
              helperText={error.username}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              size="small"
              name="password"
              type="password"
              value={formFields.password}
              onChange={handleChange}
              error={Boolean(error.password)}
              helperText={error.password}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
