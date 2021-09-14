const express = require('express');
const Saml2js = require('saml2js');
const fs = require('fs');
const path = require('path')

const passport = require('./config/passportHandler');
const authController = require('./controllers/auth');
const samlStrategy = require('./config/passportStrategy');

const router = express.Router();

router.get('/login/sso', passport.authenticate('mySamlStrategy', {
    successRedirect: '/',
    failureRedirect: '/login',
}));

router.post('/login/sso/callback', passport.authenticate('mySamlStrategy', {
    failureRedirect: '/',
    failureFlash: true,
}), (req, res, next) => {
    const xmlResponse = req.body.SAMLResponse;
    const parser = new Saml2js(xmlResponse);
    req.samlUserObject = parser.toObject();
    next();
}, authController.auth);

router.get('/metadata', (req, res) => {
    filePath = path.join(__dirname, 'certs/idp.crt');
    var decryptionCert = fs.readFileSync(filePath, 'utf-8')
    res.type('application/xml');
    return res.status(200).send(samlStrategy.generateServiceProviderMetadata());
});

module.exports = router;