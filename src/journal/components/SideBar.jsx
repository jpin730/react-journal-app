import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);

  const sortedNotes = [...notes];
  sortedNotes.sort((a, b) => +(a.title > b.title) || -1);

  const drawerContent = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {displayName}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {sortedNotes.map((note) => (
          <SideBarItem key={note.id} {...note} />
        ))}
      </List>
    </>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        container={undefined}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        open
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
