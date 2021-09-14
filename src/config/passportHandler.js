const passport = require('passport');
const samlStrategy = require('./passportStrategy');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const strategy = samlStrategy;

passport.use('mySamlStrategy' ,strategy);

module.exports = passport;