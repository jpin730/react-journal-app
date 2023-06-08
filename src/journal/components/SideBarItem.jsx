import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const titleMaxLength = 20;
  const bodyMaxLength = 45;

  const newTitle = useMemo(
    () =>
      title.length > titleMaxLength
        ? title.substring(0, titleMaxLength) + "..."
        : title,
    [title]
  );

  const newBody = useMemo(
    () =>
      body.length > bodyMaxLength
        ? body.substring(0, bodyMaxLength) + "..."
        : body,
    [body]
  );

  const onClickNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid>
          <ListItemText primary={newTitle} secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
