const authController = require('../controllers/auth')
const { globalErrorMapper } = require('../util/mappers')
const homeController = require('../controllers/home')
const cryptoController = require('../controllers/crypto')
module.exports = (app) => {
    app.use(authController)
    app.use(homeController)
    app.use(cryptoController)
    app.use(globalErrorMapper) 
   //other use >


    app.get('*', (req,res) => {
        res.render('404', {title:"Page not found"})
    })
    app.get('*/*', (req,res) => {
        res.render('404', {title:"Page not found"})
    })
}