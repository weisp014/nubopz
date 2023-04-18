import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

import ConcertItem from "../ConcertItem/ConcertItem";

function HomePage() {
  // setup dispatch
  const dispatch = useDispatch();
  // get upcoming concert list from store
  const concertList = useSelector((store) => store.concertList._embedded);
  // get loading state from store
  const loading = useSelector((store) => store.loading);
  console.log("Concert List:", concertList);

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

  return (
    <>
      {/* form for submitting new search criteria */}
      <center>
        <form onSubmit={HandleNewSearch}>
          <TextField
            type="text"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
            label="Zip Code"
            helperText="Ex: 55403"
            required
          />
          {loading ? (
            <LoadingButton
              type="submit"
              loading
              variant="contained"
              color="primary"
            >
              Find Concerts
            </LoadingButton>
          ) : (
            <Button type="submit" loading variant="contained" color="primary">
              Find Concerts
            </Button>
          )}
        </form>
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
