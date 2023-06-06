import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

import { AuthLayout } from "../layouts";
import { useForm } from "../../hooks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "Email must have an '@'."],
  password: [
    (value) => value.length >= 6,
    "Password must be 6 letters or more.",
  ],
  displayName: [(value) => value.length > 0, "Username is required."],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    displayName,
    email,
    password,
    displayNameError,
    emailError,
    passwordError,
    isFormValid,
    onInputChange,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    console.log(displayName, email, password);
  };

  return (
    <AuthLayout title="Create an account">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="text"
              name="displayName"
              label="Username"
              placeholder="Enter your username"
              value={displayName}
              error={!!displayNameError && formSubmitted}
              helperText={displayNameError}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              error={!!emailError && formSubmitted}
              helperText={emailError}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              error={!!passwordError && formSubmitted}
              helperText={passwordError}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={!isFormValid}
              >
                Create
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Have an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Log in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
