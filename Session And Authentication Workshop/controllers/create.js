module.exports = {
    get(req,res){
        res.render('create')
            },
  async  post(req,res){
const car = {
 name: req.body.name,
 imageUrl: req.body.imageUrl || undefined,
 description: req.body.description,
 price: Number(req.body.price),
 owner:req.session.user.id

}

try {
    await req.storage.createCar(car)

res.redirect('/')
} catch (error) {
    console.log('Error creating record');
    res.redirect('create')
}


    },
    
}