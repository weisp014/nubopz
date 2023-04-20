const querystring = require("querystring");

const redirect_uri = "http://localhost:5000/api/spotify/callback";
const scope = "user-read-private user-read-email";

const AUTH_URL =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: "5bf4c2c195584dd18dc002bfd73645b5",
      scope: scope,
      redirect_uri: redirect_uri,
    });

function SpotifyLogin() {

    return(
        <a href={AUTH_URL}>Login with spotify</a>
    )
}

export default SpotifyLogin;