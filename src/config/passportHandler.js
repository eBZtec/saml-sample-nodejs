const passport = require('passport');
const samlStrategy = require('./passportStrategy');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use('mySamlStrategy' , samlStrategy);

module.exports = passport;