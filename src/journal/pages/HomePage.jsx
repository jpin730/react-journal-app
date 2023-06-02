import { AddCircleOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { JournalLayout } from "../layouts";
import { NoteView, NothingSelectedView } from "../views";

export const HomePage = () => {
  return (
    <JournalLayout>
      <NothingSelectedView />
      {/* <NoteView /> */}

      <IconButton
        color="secondary"
        size="small"
        sx={{
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddCircleOutlined sx={{ fontSize: 60 }} />
      </IconButton>
    </JournalLayout>
  );
};
