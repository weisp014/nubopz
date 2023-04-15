import React, { useState } from "react";
import { useSelector } from "react-redux";

function DetailsPage() {
  const concertDetails = useSelector((store) => store.details);

  return (
    <>
      {concertDetails?.name && (
        <div>
          <img src={concertDetails.images[0].url} width={200} />
          <h2>{concertDetails.name}</h2>
          <p>
            {concertDetails._embedded && concertDetails._embedded.venues[0].name}
          </p>
          <h3>{concertDetails.dates.start.localDate}</h3>
        </div>
      )}
    </>
  );
}

export default DetailsPage;
