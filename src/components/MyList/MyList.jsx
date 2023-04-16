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
    <Grid 
        container
        spacing={{ xs: 2, md: 3 }}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {savedConcerts.length &&
          savedConcerts.map((concert) => (
            <SavedConcertItem key={concert.id} concert={concert} />
          ))}
      </Grid>
  );
}

export default MyList;
