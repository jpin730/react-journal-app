import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";

export const SideBar = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const drawerContent = (
    <>
      <Toolbar />
      <Divider />
      <List>
        {["Jan", "Feb", "Mar", "Apr"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TurnedInNot />
              </ListItemIcon>
              <Grid>
                <ListItemText primary={text} />
                <ListItemText secondary="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
              </Grid>
            </ListItemButton>
          </ListItem>
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
