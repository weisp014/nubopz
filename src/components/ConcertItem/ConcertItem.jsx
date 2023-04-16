import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

function ConcertItem({ concert }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDetails = () => {
    console.log("in HandleDetails for id:", concert.id);
    dispatch({
      type: "FETCH_CONCERT_DETAILS",
      payload: concert.id,
    });
    history.push("/details");
  };

  {
    /* <p>Price:{concert.priceRanges.length && concert.priceRanges[0].min}</p> */
  }
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={concert.images[0].url}
        title={concert.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {concert.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {concert._embedded && concert._embedded.venues[0].name}
          {concert.dates.start.localDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleDetails} size="small">
          Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ConcertItem;
