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

router.get("/callback", rejectUnauthenticated, (req, res) => {
  console.log("in callback");
  // incoming query params
  var code = req.query.code;
  console.log("code coming from spotify!!", code);
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
      // Save the access token in a cookie or session
      console.log("Access Token: ", response.data.access_token)
      req.session.access_token = response.data.access_token;
      res.redirect("http://localhost:3000/#/home");
    })
    .catch((err) => {
      console.log("error getting token", err);
      res.redirect(400, "http://localhost:3000/#/home");
    });
});

module.exports = router;
