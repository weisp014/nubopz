const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
//! added cors
const cors = require('cors');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
// !do I need a separate passport2?
const passport2 = require('./strategies/spotify.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const concertsRouter = require('./routes/concerts.router');
const spotifyRouter = require('./routes/spotify.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// !start up passport sessions for spotify
app.use(passport2.initialize());
app.use(passport2.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/concerts', concertsRouter);
app.use('/api/spotify', spotifyRouter);

//! added cors
// Serve static files
app.use(express.static('build'))
app.use(cors());

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
