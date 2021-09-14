require('dotenv').config();

const express = require('express');

const passport = require('./config/passportHandler');
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json({ limit: '15mb' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/user/v1/', routes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));