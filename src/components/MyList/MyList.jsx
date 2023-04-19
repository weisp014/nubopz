import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, ToggleButton } from "@mui/material";

import SavedConcertItem from "../SavedConcertItem/SavedConcertItem";

function MyList() {
  const dispatch = useDispatch();
  // get saved concerts from the store
  const savedConcerts = useSelector((store) => store.favorites);
  // state to track filter selection
  const [attendedFilter, setAttendedFilter] = useState(false);
  // on page load fetch user's saved concerts
  useEffect(() => {
    dispatch({
      type: "FETCH_MY_CONCERTS",
      payload: {
        attendedFilter,
      },
    });
  }, [attendedFilter]);

  return (
    <>
      <center>
        {/* toggle showing attended concerts */}
        <ToggleButton
          sx={{ margin: "10px" }}
          value="attended"
          selected={attendedFilter}
          onChange={() => {
            setAttendedFilter(!attendedFilter);
          }}
        >
          Attended
        </ToggleButton>
      </center>
      <center>
        {savedConcerts.length ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {savedConcerts.length &&
              savedConcerts.map((concert) => (
                <SavedConcertItem
                  key={concert.id}
                  concert={concert}
                  attendedFilter={attendedFilter}
                />
              ))}
          </Grid>
        ) : (
          <h2>No concerts to display</h2>
        )}
      </center>
    </>
  );
}

export default MyList;
