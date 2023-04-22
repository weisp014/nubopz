const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const querystring = require("querystring");
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "http://localhost:5000/api/spotify/callback";

/**
 * Initial source from basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

// request to exchange code received for access token to make future requests
router.get("/callback", rejectUnauthenticated, (req, res) => {
  // incoming query params from spotify
  const code = req.query.code;
  axios
    .post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
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
      console.log(response.data);
      // Save the access token in a session
      req.session.access_token = response.data.access_token;
      console.log(req.session.access_token);
      res.redirect(200, "http://localhost:3000");
    })
    .catch((err) => {
      console.log("error getting token", err);
      res.redirect(400, "http://localhost:3000");
    });
});

// search to get artist ID from Spotify
router.get("/artist/:artist", rejectUnauthenticated, (req, res) => {
    console.log("in artist", req.params.artist);
    axios
    .get(`https://api.spotify.com/v1/search?q=${req.params.artist}&type=artist`, {
        headers: {
            'Authorization': `Bearer ${req.session.access_token}`,
            'Content-Type': 'application/json'
          }
    })
    .then((response) => {
        console.log('artist response:', response.data.artists.items[0].name);
        res.send(response.data);
    })
    .catch((err) => {
        console.log("error getting artist ID", err);
        res.sendStatus(500);
    });
});

// search to get tracks by artist ID from Spotify
router.get("/tracks", rejectUnauthenticated, (req, res) => {
    console.log("in tracks", req.query.artistID);
    const artist = req.query.artistID;
    axios
    .get(`https://api.spotify.com/v1/artists/${artist}/top-tracks?market=US&limit=3`, {
        headers: {
            'Authorization': `Bearer ${req.session.access_token}`,
            'Content-Type': 'application/json'
          }
    })
    .then((response) => {
        console.log('track response:', response.data);
        res.send(response.data);
    })
    .catch((err) => {
        console.log("error getting tracks", err);
        res.sendStatus(500);
    });
});

module.exports = router;
