import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";

function ConcertItem({ concert }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDetails = () => {
    console.log("in HandleDetails for id:", concert.id);
    dispatch({
      type: "FETCH_CONCERT_DETAILS",
      payload: concert.id
    });
    dispatch({
      type: "GET_TRACKS",
      payload: concert.name
    })
    history.push("/details");
  };

  {
    /* <p>Price:{concert.priceRanges.length && concert.priceRanges[0].min}</p> */
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} style={{ textAlign: "center" }}>
      <center>
      <Card sx={{ minWidth: 300, maxWidth: 300, minHeight: 350, maxHeight: 400}}>
        <CardMedia
          sx={{ height: 200 }}
          image={concert.images[3].url}
          title={concert.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {concert.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {concert._embedded && concert._embedded.venues[0].name}
            <br></br>
            {concert.dates.start.localDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleDetails} size="large">
            Details
          </Button>
        </CardActions>
      </Card>
      </center>
    </Grid>
  );
}

export default ConcertItem;
