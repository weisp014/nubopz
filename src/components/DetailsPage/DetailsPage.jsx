import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function DetailsPage() {
  const dispatch = useDispatch();
  // get details from the store
  const concertDetails = useSelector((store) => store.details);

  // local state to control save button
  const [saveToggle, setSaveToggle] = useState(true);

  // TODO: Add info and price?
  const saveConcert = () => {
    // changing toggle to remove save button
    setSaveToggle(false);
    dispatch({
      type: "SAVE_CONCERT",
      payload: {
        event_id: concertDetails.id,
        event_name: concertDetails.name,
        venue: concertDetails._embedded.venues[0].name,
        image_url: concertDetails.images[0].url,
        date: concertDetails.dates.start.dateTime,
      },
    });
  };

  return (
    <>
      {concertDetails?.name && (
        <div>
          <img src={concertDetails.images[0].url} width={300} />
          <h2>{concertDetails.name}</h2>
          <p>
            {concertDetails._embedded &&
              concertDetails._embedded.venues[0].name}
          </p>
          <h3>{concertDetails.dates.start.dateTime}</h3>
          {/* show save button if saveToggle true */}
          {saveToggle && <button onClick={saveConcert}>SAVE</button>
          }
          
        </div>
      )}
    </>
  );
}

export default DetailsPage;
