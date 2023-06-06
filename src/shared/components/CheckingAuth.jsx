import { CircularProgress, Grid } from "@mui/material";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main" }}
    >
      <Grid item>
        <CircularProgress color="info" size={80} />
      </Grid>
    </Grid>
  );
};
