const express = require("express");
const router = express.Router();
const axios = require("axios");

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

// GET details for specific concert
router.get("/details/:id", (req, res) => {
  console.log("id:", req.params.id);
  axios.get(
    `https://app.ticketmaster.com/discovery/v2/events/${req.params.id}?apikey=${process.env.TMASTER_API_KEY}&locale=*`
  )
  .then((response) => {
    console.log("incoming details:", response.data)
    res.send(response.data);
  })
  .catch((err) => {
    console.log("error getting concert details:", err);
    res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
