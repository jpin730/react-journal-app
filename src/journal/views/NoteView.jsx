import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";

export const NoteView = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Grid item>
          <Typography fontSize={39} fontWeight="light">
            June 1st, 2023
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" size="large" startIcon={<SaveOutlined />}>
            Save
          </Button>
        </Grid>
      </Grid>

      <Grid container sx={{ mb: 3 }}>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: "none", mb: 3 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
        />
      </Grid>

      <ImageGallery />
    </>
  );
};
