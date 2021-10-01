require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieparser = require('cookie-parser');

const passport = require('./config/passportHandler');
const routes = require('./routes');

const app = express();

app.use(session({secret: process.env.SESSION_TOKEN, saveUninitialized: true, resave: true}));

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json({ limit: '15mb' }));
app.use(cors());
app.use(cookieparser());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header('Origin'));
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

app.use('/user/v1/', routes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));