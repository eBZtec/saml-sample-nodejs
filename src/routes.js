const express = require('express');
const Saml2js = require('saml2js');

const passport = require('./config/passportHandler');
const authController = require('./controllers/auth');
const samlStrategy = require('./config/passportStrategy');

const router = express.Router();

var iAuthenticated = (req, res, next) => {
	if (!req.session.user) {
		return res.redirect('/user/v1/login/sso');
	}
	next();
};

router.get('/login/sso', passport.authenticate('mySamlStrategy', {
    successRedirect: '/',
    failureRedirect: '/user/v1/login/sso',
}));

router.post('/login/sso/callback', passport.authenticate('mySamlStrategy', {
    failureRedirect: '/failed',
    failureFlash: true,
}), (req, res, next) => {
    const xmlResponse = req.body.SAMLResponse;
    const parser = new Saml2js(xmlResponse);
    req.samlUserObject = parser.toObject();

    req.session.user = req.user;

    next();
}, authController.auth);

router.get('/protected', iAuthenticated, (req, res) => {
    return res.send(req.session.user);
});

router.get('/metadata', (req, res) => {
    res.type('application/xml');
    return res.status(200).send(samlStrategy.generateServiceProviderMetadata());
});

module.exports = router;