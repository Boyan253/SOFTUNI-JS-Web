const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const bookController = require('../controllers/book')
module.exports = (app) => {

    app.use(authController)
    app.use(homeController)
    app.use(bookController)

    app.get('*', (req,res) => {
        res.render('404', {title:"Page not found"})
    })
}