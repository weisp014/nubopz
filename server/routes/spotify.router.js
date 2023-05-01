const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { refreshToken } = require("../modules/refresh-token");
const { spotifyCheck } = require("../modules/spotify-middleware");
const querystring = require("querystring");
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = "https://nubopz.herokuapp.com/api/spotify/callback";

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
      // save the access and refresh token to session
      req.session.access_token = response.data.access_token;
      req.session.refresh_token = response.data.refresh_token;
      res.redirect("http://localhost:3000");
    })
    .catch((err) => {
      console.log("error getting token", err);
      res.redirect("http://localhost:3000");
    });
});

// search to get artist ID from Spotify
router.get(
  "/artist/:artist",
  rejectUnauthenticated,
  refreshToken,
  spotifyCheck,
  (req, res) => {
    axios
      .get(
        `https://api.spotify.com/v1/search?q=${req.params.artist}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${req.session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log("error getting artist ID", err);
        res.sendStatus(500);
      });
  }
);

// search to get tracks by artist ID from Spotify
router.get("/tracks", rejectUnauthenticated, (req, res) => {
  const artist = req.query.artistID;
  axios
    .get(`https://api.spotify.com/v1/artists/${artist}/top-tracks?market=US`, {
      headers: {
        Authorization: `Bearer ${req.session.access_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error getting tracks", err);
      res.sendStatus(500);
    });
});

module.exports = router;
