const express = require('express')



const carService = require("./services/cars")
const authService = require('./services/auth')
const all = require('./services/util')
const hbs = require('express-handlebars')
const session = require("express-session")
const auth = require('./controllers/auth')
const { catalog } = require('./controllers/catalog')
const { home } = require('./controllers/home')
const { about } = require('./controllers/about')
const create  = require('./controllers/create')
const { notFound } = require('./controllers/404')
const { details } = require('./controllers/details')
const deleteCar = require('./controllers/deleteCtrl')
const  initDb = require('./models')
const accessory = require('./controllers/accessory')
const accessoryService = require('./services/accessory')
const attach = require('./controllers/attach')
const { logoutGet } = require('./controllers/auth')
const edit = require('./controllers/edit')
start()

async function start(){
 await initDb()
const app = require('express')()

app.use(session({
    secret:"Super Scary Secret",
    resave:false,
    saveUninitialized: true,
    cookie: {secure: 'auto'}
}))
app.use(express.urlencoded({extended: true}))

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine)
app.use('/static',express.static('static'))
app.use(authService())
app.use(carService())
app.use(accessoryService())
app.set('view engine', 'hbs')
app.get('/', home)
app.get('/catalog', catalog)
app.get('/about', about)
app.route('/create').get(all.isLoggedIn(),create.get).post(all.isLoggedIn(),create.post)
app.get('/details/:id', details)
app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post)
app.route('/edit/:id').get(edit.get).post(edit.post)
app.route('/accessory').get(all.isLoggedIn(),accessory.get).post(all.isLoggedIn(),accessory.post)
app.route('/attach/:id').get(all.isLoggedIn(),attach.get).post(all.isLoggedIn(),attach.post)
app.route('/login').get(auth.loginGet).post(auth.loginPost)
app.route('/register').get(auth.registerGet).post(auth.registerPost)
app.get('/logout',logoutGet)
app.get('*', notFound)
app.listen(3000)



}