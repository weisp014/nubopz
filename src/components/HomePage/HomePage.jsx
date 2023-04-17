import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";

import ConcertItem from "../ConcertItem/ConcertItem";

function HomePage() {
  // setup dispatch
  const dispatch = useDispatch();
  // get upcoming concert list from store
  const concertList = useSelector((store) => store.concertList._embedded);
  console.log("Concert List:", concertList);

  // stores values from input fields in form
  const [zipCode, setZipCode] = useState("");

  // on page load, call FETCH_CONCERTS -> results in rendering of concert events.
  // useEffect(() => {
  //   dispatch({
  //     type: "FETCH_CONCERTS",
  //   });
  // }, []);

  const HandleNewSearch = (event) => {
    event.preventDefault();
    if (zipCode === "") {
      alert("enter zip code");
    } else {
      // dispatch search criteria to concerts saga
      dispatch({
        type: "FETCH_CONCERTS",
        payload: {
          zipCode,
        },
      });
    }
  };

  return (
    <>
      {/* form for submitting new search criteria */}
      <form onSubmit={HandleNewSearch}>
        <input
          type="text"
          value={zipCode}
          onChange={(event) => setZipCode(event.target.value)}
          placeholder="zip code"
        />
        <button type="submit">Find Concerts</button>
      </form>

      <Grid 
        container
        spacing={{ xs: 2, md: 3 }}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {concertList?.events &&
          concertList.events.map((concert) => (
            <ConcertItem key={concert.id} concert={concert} />
          ))}
      </Grid>
    </>
  );
}

export default HomePage;
