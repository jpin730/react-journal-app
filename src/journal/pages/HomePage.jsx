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
          right: { xs: 15, sm: 40 },
          bottom: { xs: 10, sm: 30 },
        }}
      >
        <AddCircleOutlined sx={{ fontSize: 75 }} />
      </IconButton>
    </JournalLayout>
  );
};
