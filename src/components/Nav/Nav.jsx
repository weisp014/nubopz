import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar was not inheriting color from theme so hardcoding bgcolor to match theme */}
      <AppBar position="static" sx={{ bgcolor: "#7F67A0" }} elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nubopz
          </Typography>
          <Button component={Link} to="/info" color="inherit">
            Info
          </Button>
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Button component={Link} to="/login" color="inherit">
              Login / Register
            </Button>
          )}
          {/* If a user is logged in, show these links */}
          {user.id && <LogOutButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Nav;
