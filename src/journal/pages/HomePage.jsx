import { AddCircleOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { NoteView, NothingSelectedView } from "../views";
import { JournalLayout } from "../layouts";
import { startNewNote } from "../../store";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        color="secondary"
        size="small"
        sx={{
          position: "fixed",
          right: { xs: 15, sm: 40 },
          bottom: { xs: 10, sm: 30 },
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
      >
        <AddCircleOutlined sx={{ fontSize: 75 }} />
      </IconButton>
    </JournalLayout>
  );
};
