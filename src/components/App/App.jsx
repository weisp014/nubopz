import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import BottomNav from '../BottomNav/BottomNav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import DetailsPage from '../DetailsPage/DetailsPage';
import MyList from '../MyList/MyList';

import './App.css';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Router>
      <div>
      <Nav />
        {/* padding to make sure bottom nav bar doesn't cover page content */}
        <Box sx={{pb: 9, m:2}}>
        
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* User does not need to be logged in to see the home page and search for concerts*/}
          <Route
            exact
            path="/home"
          >
            <HomePage />
          </Route>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /home page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <ProtectedRoute
            // logged in shows DetailsPage else shows LoginPage
            exact
            path="/details"
          >
            <DetailsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows My List else shows LoginPage
            exact
            path="/myList"
          >
            <MyList />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <BottomNav />
        {/* <Footer /> */}
        </Box>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
