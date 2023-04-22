import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";

function DetailsPage() {
  const dispatch = useDispatch();
  // get details from the store
  const concertDetails = useSelector((store) => store.details);
  // get tracks from the store
  const tracks = useSelector((store) => store.tracks);
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
            {saveToggle && (
              <Button
                sx={{ marginBottom: "10px" }}
                variant="contained"
                color="primary"
                onClick={saveConcert}
              >
                SAVE
              </Button>
            )}
            <Snackbar
              open={open}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setOpen(false)}
            >
              <Alert severity="success" sx={{ width: "100%" }}>
                Concert Saved!
              </Alert>
            </Snackbar>
          </div>

          <h1>Top Tracks:</h1>
          {tracks.length && (
            <div>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                <h3>{tracks[0].name}</h3>
                <h3>{tracks[1].name}</h3>
                <h3>{tracks[2].name}</h3>
              </Stack>
              <Stack
                direction="column"
                alignItems="flex-start"
                justifyContent="center"
                spacing={2}
              >
                <Button variant="outlined" href={tracks[0].uri}>
                  LISTEN
                </Button>
                <Button variant="outlined" href={tracks[1].uri}>
                  LISTEN
                </Button>
                <Button variant="outlined" href={tracks[2].uri}>
                  LISTEN
                </Button>
              </Stack>
            </div>
          )}
        </center>
      )}
    </>
  );
}

export default DetailsPage;
