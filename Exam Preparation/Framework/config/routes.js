const authController = require('../controllers/auth')


module.exports = (app) => {

    app.use(authController)
   //other use >


    app.get('*', (req,res) => {
        res.render('404', {title:"Page not found"})
    })
}