module.exports = {
    auth (req, res) {
        try {
            return res.redirect('/user/v1/protected');
        } catch(err) {
            return res.status(500).send(err);
        }
    },
};