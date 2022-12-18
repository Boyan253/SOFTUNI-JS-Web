const app = require('express')()
const express = require('express')
const exhbs = require('express-handlebars')
const handlebars = exhbs.create({
    extname: '.hbs'
})

app.engine('.hbs', handlebars.engine)
app.use(express.static('views'))
app.set('view engine', '.hbs')
let visitors = 0
const product = [
    {
        name: 'Ellibot', price: 10
    },
    {
        name: 'Kellibot', price: 11
    }, 
    {
        name: 'Gellibot', price: 12
    }

]
app.get('/', (req, res) => {
    res.locals = {
        count: visitors++,
        product,
        title: 'home Page'
    }
    res.render('home')
})
app.get('/catalog', (req, res) => {
    res.locals = {
      
        product,
        title: 'Catalog Page'
    }
    res.render('catalog')
})
app.listen(3000)