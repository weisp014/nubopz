const axios = require("axios");
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const querystring = require("querystring");

// get refreshed access token from spotify
const refreshToken = (req, res, next) => {
  if (req.session.refresh_token) {
    console.log("in refreshToken");
    axios
      .post(
        `https://accounts.spotify.com/api/token`,
        querystring.stringify({
          grant_type: "refresh_token",
          refresh_token: req.session.refresh_token,
        }),
        {
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(client_id + ":" + client_secret).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log("refresh data", response.data);
        // delete old and save new access token
        delete req.session.access_token;
        console.log("session:", req.session);
        req.session.access_token = response.data.access_token;
        // got new access token. now do the next thing
        next();
      })
      .catch((err) => {
        console.log("error getting refresh token", err);
        res.sendStatus(500);
      });
  } else {
    next();
  }
};

module.exports = { refreshToken };
