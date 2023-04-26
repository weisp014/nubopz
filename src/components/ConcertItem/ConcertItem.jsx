import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

function ConcertItem({ concert }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDetails = () => {
    console.log("in HandleDetails for id:", concert.id);
    dispatch({
      type: "FETCH_CONCERT_DETAILS",
      payload: concert.id,
    });
    dispatch({
      type: "GET_TRACKS",
      payload: concert.name,
    });
    // get user's upcoming concert list to be able to check if concert has already been saved to their list
    dispatch({
      type: "FETCH_MY_CONCERTS",
      payload: {
        attendedFilter: false
      },
    });
    history.push("/details");
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
        <Card
          sx={{ minWidth: 300, maxWidth: 300, minHeight: 300, maxHeight: 300 }}
          onClick={handleDetails}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              image={concert.images[3].url}
              alt={concert.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" noWrap={true}>
                {concert.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {concert._embedded && concert._embedded.venues[0].name}
                <br></br>
                {concert.dates.start.localDate}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </center>
    </Grid>
  );
}

export default ConcertItem;
