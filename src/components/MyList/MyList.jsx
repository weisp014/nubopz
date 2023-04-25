import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, ToggleButton, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import SavedConcertItem from "../SavedConcertItem/SavedConcertItem";

function MyList() {
  const dispatch = useDispatch();
  // get saved concerts from the store
  const savedConcerts = useSelector((store) => store.favorites);
  // creating new array of only concert names from list of saved concerts as options for search input
  const searchConcerts = savedConcerts.map((concert) => concert.event_name);
  // state to track filter selection
  const [attendedFilter, setAttendedFilter] = useState(false);
  // state to track name entered in search input
  const [searchValue, setSearchValue] = useState(null);
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap="34px"
          sx={{ mb: "30px" }}
        >
          {/* toggle showing attended concerts */}
          <ToggleButton
            value="attended"
            color="primary"
            selected={attendedFilter}
            onChange={() => {
              setAttendedFilter(!attendedFilter);
            }}
          >
            Attended
          </ToggleButton>
          {/* Search field for saved concerts */}
          <Autocomplete
            disablePortal
            value={searchValue}
            onChange={(event, newSearchValue) => {
              setSearchValue(newSearchValue);
            }}
            id="concert-search"
            options={searchConcerts}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Search for Concert" />
            )}
          />
        </Stack>
      </center>
      <center>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Check if search input is null (not entered),
           true: map out list of concerts
           false: only map out concerts where the name matches the search input value */}
          {searchValue === null ? (
            savedConcerts.length ? (
              savedConcerts.map((concert) => (
                <SavedConcertItem
                  key={concert.id}
                  concert={concert}
                  attendedFilter={attendedFilter}
                />
              ))
            ) : (
              <h2>No concerts to display</h2>
            )
          ) : (
            savedConcerts.filter(
              (concert) => concert.event_name === searchValue
            ).map((concert) => (
              <SavedConcertItem
                key={concert.id}
                concert={concert}
                attendedFilter={attendedFilter}
              />
            ))
          )}
        </Grid>
      </center>
    </>
  );
}

export default MyList;
