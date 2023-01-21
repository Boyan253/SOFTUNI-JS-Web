const router = require('express').Router()
const { isUser, isGuest } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { register, login } = require('../services/user');
const {mapErrors} = require('../util/mappers');






router.get('/register', isGuest(), (req, res) => {

    res.render('register');
})
router.post('/register', isGuest(), async (req, res) => {

    //TODO check form action, method, field names
    try {
       if (req.body.password.trim() == '') {
        throw new Error('Password is required')
       }
        else if (req.body.password != req.body.repass) {
            throw new Error('Passwords dont match')
        }
        const user = await register(req.body.email, req.body.password, req.body.gender)

        req.session.user = user
        res.redirect('/') //TODO check redirect requirenements
    } catch (err) {
console.error(err)
const isMale = req.body.gender == 'male'
//TODO send error messages
        const errors = mapErrors(err)
       
        res.render('register', { title: 'Register Page', data:{email: req.body.email, isMale}, errors });
    }

})
router.get('/login', isGuest(), (req, res) => {

    res.render('login', { title: 'Login Page' });
})
    //TODO check form action, method, field names

router.post('/login', isGuest(), async (req, res) => {
    try {

        const user = await login(req.body.email, req.body.password)
        req.session.user = user
        res.redirect('/')//TODO check redirect requirenements
    } catch (error) {
        //TODO send error messages
        const errors = mapErrors(error)
        console.error(error)
        res.render('login', { title: 'Login Page', data: { email: req.body.email }, errors });
    };

})
router.get('/logout', isUser(), (req, res) => {
    delete req.session.user
    res.redirect('/')
})
module.exports = router