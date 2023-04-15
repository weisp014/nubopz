const express = require('express');
const router = express.Router();
const axios = require("axios");

// GET list of upcoming concerts starting from today's date
router.get('/', (req, res) => {
  // get today's date
  const today = new Date();
  console.log(today);
  console.log("today:", today.toDateString());

  // incoming query params
  const zip = req.query.zip;
  // hard-coded 30 mile radius around zip code
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=
      ${process.env.TMASTER_API_KEY}&locale=*&startDateTime=2023-04-15T00:00:00Z
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
