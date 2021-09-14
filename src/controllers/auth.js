module.exports = {
    auth (req, res) {
        try {
            const { samlUserObject } = req;

            return res.send(samlUserObject);
        } catch(err) {
            return res.status(500).send(err);
        }
    },
};