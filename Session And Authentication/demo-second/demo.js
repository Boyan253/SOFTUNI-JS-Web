
const express = require('express')


const app = express()

const session = {}
function mySession(req,res,next){
    const cookie = (req.headers.cookie || '')
    .split(';')
    .map(t => t.trim())
    .map(t => t.split('='))
    .reduce((a, [k,v]) => Object.assign(a, {[k] : v}), {})
    console.log(cookie);
    
    
    let user = session[cookie.sessionId]
    
    if (user == undefined) {
    
        const newId = ('000000' + (Math.random() * 999999).toString(16)).slice(-6)
        console.log(newId);
        user = {
            visited: 1
        }
        session[newId] = user
        res.setHeader('Set-Cookie',`sessionId=${newId}`)
    }else{
        user.visited++
    }
    req.session = user
    next()


}
app.use(mySession)
app.get('/', (req,res) => {



    res.send(`${req.session.visited}`)



})




app.listen(3000)