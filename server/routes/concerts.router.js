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

// POST concert info to user's saved list
// will NOT allow same concert ID to be added by a user twice
// "user_id" AND "event_id" needs to be unique combination
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

  // send information to DB
  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error saving concert info:", err);
      res.sendStatus(500);
    });
});

// GET list of user's saved concerts
router.get("/favorites", rejectUnauthenticated, (req, res) => {
  // check if user's ID is a match
  // order concerts that haven't been attended first and newest dates
  const queryText = `SELECT * FROM "favorites"
                      WHERE "user_id" = $1
                      ORDER BY 
                      "attended" ASC,
                      "date" ASC;`;

  pool
    .query(queryText, [req.user.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("error getting saved concerts:", err);
      res.sendStatus(500);
    });
});

// PUT to update attended for concert in user's saved concerts
router.put("/favorites", rejectUnauthenticated, (req, res) => {
  // update attended column for this user's specific event
  const queryText = `UPDATE "favorites"
                      SET "attended" = $1
                      WHERE "user_id" = $2 AND "event_id" = $3;`;
  const queryParams = [req.body.attended, req.user.id, req.body.event_id];

  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error updating attended:", err);
      res.sendStatus(500);
    });
});

// DELETE concert from user's saved concerts
router.delete("/favorites/:id", rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "favorites" WHERE "user_id" = $1 AND "event_id" = $2`;
  const queryParams = [req.user.id, req.params.id];
  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error removing concert:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
