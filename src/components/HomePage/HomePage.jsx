import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { TextField, Button, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import ConcertItem from "../ConcertItem/ConcertItem";

function HomePage() {
  // setup dispatch
  const dispatch = useDispatch();
  // get upcoming concert list from store
  const concertList = useSelector((store) => store.concertList._embedded);
  // get loading state from store
  const isLoading = useSelector((store) => store.loading);

  // stores values from input fields in form
  const [zipCode, setZipCode] = useState("");

  const HandleNewSearch = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_LOADING",
    });
    // dispatch search criteria to concerts saga
    dispatch({
      type: "FETCH_CONCERTS",
      payload: {
        zipCode,
      },
    });
  };

  const loginSpotify = () => {
    dispatch({
      type: "LOGIN_SPOTIFY"
    });
  }

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
              value={zipCode}
              onChange={(event) => setZipCode(event.target.value)}
              label="Zip Code"
              helperText="Ex: 55403"
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
      <Button type="button" variant="contained" color="secondary" onClick={loginSpotify}>Login with Spotify</Button>
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
