const express = require('express')



const carService = require("./services/cars")

const hbs = require('express-handlebars')
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
start()

async function start(){
 await initDb()
const app = require('express')()
const edit = require('./controllers/edit')
app.use(express.urlencoded({extended: true}))

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine)
app.use('/static',express.static('static'))

app.use(carService())
app.use(accessoryService())
app.set('view engine', 'hbs')
app.get('/', home)
app.get('/catalog', catalog)
app.get('/about', about)
app.route('/create').get(create.get).post(create.post)
app.get('/details/:id', details)
app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post)
app.route('/edit/:id').get(edit.get).post(edit.post)
app.route('/accessory').get(accessory.get).post(accessory.post)
app.route('/attach/:id').get(attach.get).post(attach.post)
app.get('*', notFound)
app.listen(3000)



}