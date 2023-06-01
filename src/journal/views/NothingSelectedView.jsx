import { AdsClickOutlined, StarOutline } from "@mui/icons-material";
import { Grid, Toolbar, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Grid item>
        <AdsClickOutlined color="primary" sx={{ fontSize: 100 }} />
      </Grid>

      <Grid item>
        <Typography variant="h5" color="">
          Select or Create a note
        </Typography>
      </Grid>

      <Grid item>
        <Toolbar />
      </Grid>
    </Grid>
  );
};
