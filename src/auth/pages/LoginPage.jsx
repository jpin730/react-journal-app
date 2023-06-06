import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  AUTH_STATUS,
  checkingAuthentication,
  startGoogleSignIn,
} from "../../store";
import { AuthLayout } from "../layouts";
import { useForm } from "../../hooks";

export const LoginPage = () => {
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: "user@email.com",
    password: "123456",
  });

  const isAuthenticating = useMemo(
    () => status === AUTH_STATUS.checking,
    [status]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkingAuthentication(email, password));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create an account
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
