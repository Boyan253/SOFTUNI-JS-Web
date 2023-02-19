const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const photoController = require('../controllers/photo')
module.exports = (app) => {

    app.use(authController)
    app.use(homeController)
    app.use(photoController)
    //other use >


    app.get('*', (req, res) => {
        res.render('404', { title: "Page not found" })
    })
}