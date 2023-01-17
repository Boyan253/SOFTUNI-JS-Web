module.exports = {
   async home(req,res){
  console.log(req.session);
      const cars =  await req.storage.getAll(req.query)
res.render('index', {cars})

    }
}