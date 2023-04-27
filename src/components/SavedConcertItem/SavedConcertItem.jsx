import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import AlertDialog from "./RemoveAlert";
import Tooltip from "@mui/material/Tooltip";

function SavedConcertItem({ concert, attendedFilter }) {
  const dispatch = useDispatch();

  // update concert with opposite value for attended to toggle
  const changeAttended = () => {
    dispatch({
      type: "UPDATE_CONCERT_ATTENDED",
      payload: {
        event_id: concert.event_id,
        attended: !concert.attended,
        attendedFilter: attendedFilter,
      },
    });
  };

  const removeConcert = () => {
    dispatch({
      type: "REMOVE_CONCERT",
      payload: {
        event_id: concert.event_id,
        attendedFilter: attendedFilter,
      },
    });
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
      style={{ textAlign: "center" }}
    >
      <center>
        <Card sx={{ minWidth: 300, maxWidth: 300, minHeight: 350 }}>
          {/* clicking card image will take user to ticketmaster ticket page */}
          <Tooltip title="Buy Tickets" placement="top">
          <CardActionArea href={concert.tickets} target="_blank">
            <CardMedia
              sx={{ height: 200 }}
              image={concert.image_url}
              alt={concert.event_name}
            />
          </CardActionArea>
          </Tooltip>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {concert.event_name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {concert.venue}
              <br></br>
              {concert.date}
            </Typography>
          </CardContent>
          {/* If concert attended is false show button option to mark as attended */}
          <CardActions sx={{ justifyContent: "space-between" }}>
            {!concert.attended && (
              <Button onClick={changeAttended} size="small">
                Attended
              </Button>
            )}
            <AlertDialog removeConcert={removeConcert} />
          </CardActions>
        </Card>
      </center>
    </Grid>
  );
}

export default SavedConcertItem;
