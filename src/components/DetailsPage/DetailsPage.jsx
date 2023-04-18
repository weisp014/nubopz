import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function DetailsPage() {
  const dispatch = useDispatch();
  // get details from the store
  const concertDetails = useSelector((store) => store.details);

  // state to control save button
  const [saveToggle, setSaveToggle] = useState(true);
  // state to control snackbar
  const [open, setOpen] = useState(false);
  // custom alert component from MUI
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // TODO: Add info and price?
  const saveConcert = () => {
    // changing toggle to remove save button
    setSaveToggle(false);
    // show snackbar
    setOpen(true);
    dispatch({
      type: "SAVE_CONCERT",
      payload: {
        event_id: concertDetails.id,
        event_name: concertDetails.name,
        venue: concertDetails._embedded.venues[0].name,
        image_url: concertDetails.images[0].url,
        date: concertDetails.dates.start.localDate,
        time: concertDetails.dates.start.localTime,
      },
    });
  };

  return (
    <>
      {concertDetails?.name && (
        <center>
          <div>
            <img src={concertDetails.images[3].url} width={300} />
            <h2>{concertDetails.name}</h2>
            <p>
              {concertDetails._embedded.venues[0].name},{" "}
              {concertDetails._embedded.venues[0].city.name}
            </p>
            <h3>
              {concertDetails.dates.start.localDate}{" "}
              {concertDetails.dates.start.localTime}
            </h3>
            {/* show save button if saveToggle true and show snackbar after clicking SAVE */}
            {saveToggle && <button onClick={saveConcert}>SAVE</button>}
            <Snackbar open={open} anchorOrigin={{vertical: "top", horizontal: "center"}} autoHideDuration={2000} onClose={() => setOpen(false)}>
              <Alert
                severity="success"
                sx={{ width: "100%" }}
              >
                Concert Saved!
              </Alert>
            </Snackbar>
          </div>
        </center>
      )}
    </>
  );
}

export default DetailsPage;
