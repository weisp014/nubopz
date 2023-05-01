import { Button } from "@mui/material";

const querystring = require("querystring");
const redirect_uri = "https://nubopz.herokuapp.com/api/spotify/callback";
const scope = "user-read-private user-read-email";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?" +
  querystring.stringify({
    response_type: "code",
    client_id: "5bf4c2c195584dd18dc002bfd73645b5",
    scope: scope,
    redirect_uri: redirect_uri,
    show_dialog: "true",
  });

// returns a link to spotify login page
function SpotifyLogin() {
  return <Button sx={{ margin: "20px", backgroundColor: "#1DB954" }} variant="contained" href={AUTH_URL}>Login with spotify</Button>;
}

export default SpotifyLogin;
