function userSession() {
    return function (req, res, next) {
        if (req.session.user) {
            res.locals.user = req.session.user
            res.locals.hasUser = true;
        }
        next()
    }
}
module.exports = userSession