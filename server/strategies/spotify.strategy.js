const passport2 = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport2.serializeUser((user, done) => {
    done(null, user.id);
  });

passport2.deserializeUser((id, done) => {
    done(null, user);
  });

// authenticate spotify user with clientID and clientSecret
passport2.use(
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000'
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
        User.findOrCreate({ spotifyId: profile.id }, (err, user) => {
          return done(err, user);
        });
      }
    )
  );

  module.exports = passport2;