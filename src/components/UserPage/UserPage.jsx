import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ConcertItem from "../ConcertItem/ConcertItem";

function UserPage() {
  // setup dispatch
  const dispatch = useDispatch();
  // get upcoming concert list from store
  const concertList = useSelector((store) => store.concertList._embedded);
  console.log('Concert List:', concertList);

// on page load, run 'FETCH_CONCERTS' -> results in rendering of concert events.
useEffect(() => {
  dispatch({
    type: "FETCH_CONCERTS",
  });
}, []);

  return (
    <div id="concertContainer">
      {concertList?.events &&
        concertList.events.map((concert) => (
          <ConcertItem key={concert.id} concert={concert} />
        ))}
    </div>
  );
}

export default UserPage;
