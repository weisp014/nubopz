import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";

function SavedConcertItem({ concert }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // update concert with opposite value for attended to be able to toggle
  const changeAttended = () => {
    console.log("in changeAttended for id:", concert.id);
    // dispatch({
    //   type: "UPDATE_CONCERT_ATTENDED",
    //   payload: !concert.attended,
    // });
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
      <Card sx={{ minWidth: 300, minHeight: 400 }}>
        <CardMedia
          sx={{ height: 200 }}
          image={concert.image_url}
          title={concert.event_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {concert.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {concert.venue}
            <br></br>
            {concert.date}
          </Typography>
        </CardContent>
        {/* Toggle attended button based on if "attended" is currently true or false */}
        <CardActions>
          {concert.attended ? (
            <Button onClick={changeAttended} size="small">
              Attended
            </Button>
          ) : (
            <Button onClick={changeAttended} size="small">
              Not Attended
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default SavedConcertItem;
