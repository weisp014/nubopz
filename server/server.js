const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// added for spotify use
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const concertsRouter = require("./routes/concerts.router");
const spotifyRouter = require("./routes/spotify.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/concerts", concertsRouter);
app.use("/api/spotify", spotifyRouter);

// Serve static files
app.use(express.static("build"))

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
