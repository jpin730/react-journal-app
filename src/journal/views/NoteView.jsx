import { Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SaveOutlined } from "@mui/icons-material";
import { useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { ImageGallery } from "../components";
import { useForm } from "../../hooks";
import { setActiveNote, startSaveNote } from "../../store";

export const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(
    () =>
      new Date(date).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [date]
  );

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Updated Note", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote(formState));
  };
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
            {dateString}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            size="large"
            startIcon={<SaveOutlined />}
            disabled={isSaving}
            onClick={onSaveNote}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <Grid container sx={{ mb: 3 }}>
        <TextField
          fullWidth
          type="text"
          name="title"
          label="Title"
          variant="filled"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 3 }}
        />
        <TextField
          fullWidth
          multiline
          type="text"
          name="body"
          variant="filled"
          label="What happened today?"
          minRows={5}
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery />
    </>
  );
};
