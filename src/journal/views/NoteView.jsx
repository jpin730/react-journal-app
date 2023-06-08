import {
  DeleteOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks";

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

  const fileInputRef = useRef();

  const onSaveNote = () => {
    dispatch(startSaveNote(formState));
  };

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return;
    dispatch(startUploadingFiles(target.files));
    target.files = new DataTransfer().files;
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
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
          <input
            multiple
            type="file"
            onChange={onFileInputChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          <Button
            color="primary"
            size="large"
            startIcon={<UploadOutlined />}
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
          >
            Upload images
          </Button>

          <Button
            color="primary"
            size="large"
            startIcon={<SaveOutlined />}
            disabled={isSaving}
            onClick={onSaveNote}
          >
            Save
          </Button>

          <Button
            color="error"
            size="large"
            startIcon={<DeleteOutlined />}
            disabled={isSaving}
            onClick={onDelete}
          >
            Delete
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

      <ImageGallery images={note.imageUrls} title={title} />
    </>
  );
};
