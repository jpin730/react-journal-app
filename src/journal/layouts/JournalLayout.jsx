import { Box, Toolbar } from "@mui/material";

import { NavBar, SideBar } from "../components";
import { useState } from "react";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      <SideBar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, overflowWrap: "anywhere" }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
