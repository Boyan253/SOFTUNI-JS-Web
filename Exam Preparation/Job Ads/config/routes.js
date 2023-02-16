const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const adController = require('../controllers/ad')
module.exports = (app) => {

    app.use(authController)
    app.use(homeController)
    app.use(adController)
    //other use >


    app.get('*', (req, res) => {
        res.render('404', { title: "Page not found" })
    })
}