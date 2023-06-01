import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";

export const NavBar = ({ drawerWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          sm: `calc(100% - ${drawerWidth}px)`,
        },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
          onClick={handleDrawerToggle}
        >
          <MenuOutlined />
        </IconButton>

        <Grid container direction="row" justifyContent="space-between">
          <Typography variant="h6" noWrap component="div" lineHeight={2}>
            React Journal App
          </Typography>

          <Button
            color="inherit"
            endIcon={<LogoutOutlined />}
            sx={{ textTransform: "none" }}
          >
            Logout
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
