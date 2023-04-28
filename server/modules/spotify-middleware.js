const spotifyCheck = (req, res, next) => {
    // check if user has access token in session
    if (req.session.access_token) {
      // if user has an access token continue to spotify request
      next();
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(401);
    }
  };
  
  module.exports = { spotifyCheck };
  