const { urlencoded } = require('express')
const express = require('express')

const expSession = require('express-session')



const app = express()
app.use(express.urlencoded({extended:true}))
app.use(expSession({
    secret: "super secret",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: "auto"}
}))
app.get('/', (req,res) => {
console.log(req.session.user);

    res.sendFile(__dirname + "/index.html")




})


app.get('/login', (req,res) => {


    res.sendFile( __dirname + "/login.html")




})

app.post('/login', (req,res) => {
    if(req.body.username == 'peter' && req.body.password == "123"){
        console.log("Succesful login");
        req.session.user = 'peter'
    }

console.log(req.body);
res.redirect('/')



})

app.listen(3000)