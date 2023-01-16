module.exports = {

loginGet(req,res){
res.render('login')

},
async loginPost(req,res){

try {
    await req.auth.login(req.body.username,req.body.password)
    res.redirect('/')
} catch (error) {
    console.log(error.message);
    res.redirect('/login')
    
}

    

},
registerGet(req,res){
    res.render('register')

},
async registerPost(req,res){
if(req.body.username == '' || req.body.password == ''){
    return res.redirect('/register')
}
if(req.body.password != req.body.repeatPassword){
    return res.redirect('/register')
}
try {
    await req.auth.register(req.body.username, req.body.password)
} catch (err) {
    console.log(err.message);
    return res.redirect('/register')
}
    console.log(req.body);
    res.redirect('/')


},

 logoutGet(req,res){
    req.auth.logout(req.session)
    res.redirect("/")
}
}