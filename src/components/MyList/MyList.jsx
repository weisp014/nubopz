import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";

import SavedConcertItem from "../SavedConcertItem/SavedConcertItem";

function MyList() {
  const dispatch = useDispatch();
  // get saved concerts from the store
  const savedConcerts = useSelector((store) => store.favorites);
  console.log(savedConcerts);
  // on page load fetch user's saved concerts
  useEffect(() => {
    dispatch({
      type: "FETCH_MY_CONCERTS",
    });
  }, []);

  return (
    <>
    <center>
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {savedConcerts.length &&
        savedConcerts.map((concert) => (
          <SavedConcertItem key={concert.id} concert={concert} />
        ))}
    </Grid>
    </center>
    </>
  );
}

export default MyList;
