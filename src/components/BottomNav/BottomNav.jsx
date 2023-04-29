import { useState } from "react";
import { Link } from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';

function BottomNav() {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation
    showLabels
    value={value} 
    onChange={(event, newValue) => {
      setValue(newValue);
    }}>
      <BottomNavigationAction
        component={Link}
        to="/home"
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/myList"
        label="My List"
        value="myList"
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
