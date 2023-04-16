const express = require("express");
const router = express.Router();
const axios = require("axios");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET list of upcoming concerts starting from today's date
router.get("/", (req, res) => {
  // get today's date
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  // incoming query params
  const zip = req.query.zip;
  // hard-coded 30 mile radius around zip code
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=
      ${process.env.TMASTER_API_KEY}&locale=*&startDateTime=${today}T00:00:00Z
      &sort=date,name,asc&segmentName=Music&postalCode=${zip}&radius=30`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error getting concert list:", err);
      res.sendStatus(500);
    });
});

// GET details for specific concert by ID
router.get("/details/:id", (req, res) => {
  console.log("id:", req.params.id);
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events/${req.params.id}?apikey=
    ${process.env.TMASTER_API_KEY}&locale=*`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log("error getting concert details:", err);
      res.sendStatus(500);
    });
});

//  POST concert info to user's saved list
router.post("/", rejectUnauthenticated, (req, res) => {
  const queryParams = [
    req.user.id,
    req.body.event_id,
    req.body.event_name,
    req.body.venue,
    req.body.image_url,
    req.body.date,
  ];
  const queryText = `INSERT INTO "favorites" 
    ("user_id", "event_id", "event_name", "venue", "image_url", "date")
    VALUES ($1, $2, $3, $4, $5, $6);`;

  pool
    .query(queryText, queryParams)
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error saving concert info:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
