const express = require("express");
const passport = require("passport");

const router = express.Router();
// sends user to spotify to login and authenticate
// then redirects back to this application
// includes scope the user agrees to for their spotify account
// passport changes the end route to https://accounts.spotify.com/authorize?
router.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private", "streaming"],
    showDialog: true,
  })
);

router.get(
  '/auth/spotify/callback',
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  (req, res) => {
    // after successful authentication redirect to path below
    res.redirect("/");
  }
);

module.exports = router;
