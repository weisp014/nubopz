import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

function BottomNav() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation 
    sx={{ width: '100%', position: 'fixed', bottom: 0 }} 
    showLabels
    value={value} 
    onChange={(event, newValue) => {
      setValue(newValue);
    }}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
  );
}

export default BottomNav;
