const passportSaml = require('passport-saml');

const strategy = new passportSaml.Strategy(
    {
        entryPoint: process.env.SSO_ENTRYPOINT,
        issuer: process.env.SSO_ISSUER,
        callbackUrl: process.env.SSO_CALLBACK_URL, 
        cert: process.env.SSO_CERT,
    },
    (profile, done) => done(null, profile),
);

module.exports = strategy;