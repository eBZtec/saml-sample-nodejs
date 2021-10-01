module.exports = {
    auth (req, res) {
        try {
            res.cookie(`authUser`, req.session.user,{
                maxAge: 5000,
                // expires works the same as the maxAge
                expires: new Date('01 12 2021'),
                //secure: true,
                httpOnly: true,
                sameSite: 'lax'
            });
            return res.redirect('http://localhost:3001');
        } catch(err) {
            return res.status(500).send(err);
        }
    },
};