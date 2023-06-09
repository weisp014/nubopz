import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Snackbar, Button, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

import SpotifyLogin from "../HomePage/SpotifyLogin";

function DetailsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  // get user info from store
  const user = useSelector((store) => store.user);
  // get details from the store
  const concertDetails = useSelector((store) => store.details);
  // get tracks from the store
  const tracks = useSelector((store) => store.tracks);
  // get user's saved concerts
  const favorites = useSelector((store) => store.favorites);
  // state to control snackbar
  const [open, setOpen] = useState(false);
  // custom alert component from MUI
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const { id: concertId } = useParams();

  // on page load grab id from url and fetch details
  useEffect(() => {
    dispatch({
      type: "FETCH_CONCERT_DETAILS",
      payload: concertId,
    });
  }, []);

  // save concert details to user's list
  function saveConcert() {
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
        tickets: concertDetails.url,
      },
    });
  }
  // clear details and tracks and go to previous page
  const goBack = () => {
    dispatch({
      type: "CLEAR_CONCERT_DETAILS",
    });
    dispatch({
      type: "CLEAR_TRACKS",
    });
    history.goBack();
  };

  return (
    <>
      <Button sx={{ marginBottom: "10px" }} onClick={goBack}>
        <ArrowBackIosIcon />
        Back
      </Button>
      {concertDetails?.name && (
        <center>
          <Box m="auto" sx={{ width: "100%", maxWidth: 460 }}>
            <Paper sx={{ pt: 2, pb: 2 }}>
              <img src={concertDetails.images[3].url} width={300} />
              <h2>{concertDetails.name}</h2>
              <p>
                {concertDetails._embedded.venues[0].name},{" "}
                {concertDetails._embedded.venues[0].city.name}
              </p>
              <h3>
                {concertDetails.dates.start.localDate}{" "}
                {/* Change 24hr time format to 12hr */}
                {Number(concertDetails.dates.start.localTime.split(":")[0]) >=
                12
                  ? `${
                      Number(
                        concertDetails.dates.start.localTime.split(":")[0]
                      ) - 12
                    }:${concertDetails.dates.start.localTime.split(":")[1]}PM`
                  : `${concertDetails.dates.start.localTime.split(":")[0]}AM`}
              </h3>
              <Stack direction="row" justifyContent="center" spacing={3}>
                {/* show save button if concert is not already saved in user's list, otherwise disable button */}
                {favorites.filter(
                  (savedConcert) => savedConcert.event_id === concertDetails.id
                ).length === 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={saveConcert}
                  >
                    SAVE
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="contained"
                    color="primary"
                    onClick={saveConcert}
                  >
                    SAVE
                  </Button>
                )}
                {/* link to tickets in a new tab */}
                <Button
                  variant="contained"
                  color="secondary"
                  href={concertDetails.url}
                  target="_blank"
                >
                  BUY TICKETS
                </Button>
              </Stack>
              {/* show snackbar after clicking SAVE */}
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
            </Paper>
          </Box>
        </center>
      )}
      {tracks.length ? (
        <Box m="auto" sx={{ width: "100%", maxWidth: 460 }}>
          <Paper>
            <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
              Top Tracks{" "}
              <img src="./images/Spotify_Icon_RGB_Green.png" width="21" />
            </Typography>
            <List>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="play" href={tracks[0].uri}>
                    <PlayCircleIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={tracks[0].name} />
              </ListItem>
              {tracks[1] && (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="play"
                      href={tracks[1].uri}
                    >
                      <PlayCircleIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={tracks[1].name} />
                </ListItem>
              )}
              {tracks[2] && (
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="play"
                      href={tracks[2].uri}
                    >
                      <PlayCircleIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={tracks[2].name} />
                </ListItem>
              )}
            </List>
          </Paper>
        </Box>
      ) : user.spotify ? (
        <center>
          <h2>No tracks found for artist</h2>
        </center>
      ) : (
        <center>
          <h2>Login to spotify to listen to top tracks!</h2>
          <SpotifyLogin />
        </center>
      )}
    </>
  );
}

export default DetailsPage;
