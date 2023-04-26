import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { TextField, Button, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import ConcertItem from "../ConcertItem/ConcertItem";
import SpotifyLogin from "./SpotifyLogin";

function HomePage() {
  // setup dispatch
  const dispatch = useDispatch();
  // get upcoming concert list from store
  const concertList = useSelector((store) => store.concertList._embedded);
  // get loading state from store
  const isLoading = useSelector((store) => store.loading);
  // get user info from store
  const user = useSelector((store) => store.user);
  // stores values from input fields in form
  const [city, setCity] = useState("");

  const HandleNewSearch = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_LOADING",
    });
    // dispatch search criteria to concerts saga
    dispatch({
      type: "FETCH_CONCERTS",
      payload: {
        city: city,
      },
    });
  };

  return (
    <>
      {/* form for submitting new search criteria */}
      <center>
        <form onSubmit={HandleNewSearch}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="center"
            spacing={2}
          >
            <TextField
              sx={{ width: "150px", margin: "5px" }}
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              label="Enter City"
              helperText="Ex: Minneapolis"
              required
              autoFocus
            />
            {isLoading ? (
              <LoadingButton
                type="submit"
                loading
                variant="contained"
                color="primary"
              >
                Find<br></br>Concerts
              </LoadingButton>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Find<br></br>Concerts
              </Button>
            )}
          </Stack>
        </form>
      </center>
      <center>
        {/* show spotify login button if spotify status is false */}
        {!user.spotify && <SpotifyLogin />}
      </center>
      <center>
        {concertList?.events ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {concertList?.events &&
              concertList.events.map((concert) => (
                <ConcertItem key={concert.id} concert={concert} />
              ))}
          </Grid>
        ) : (
          <h2>No concerts found. Try again!</h2>
        )}
      </center>
    </>
  );
}

export default HomePage;
