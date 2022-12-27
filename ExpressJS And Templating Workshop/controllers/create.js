module.exports = {
    create(req,res){
        res.render('create')
    },
  async  post(req,res){
const car = {
 name: req.body.name,
 imageUrl: req.body.imageUrl,
 description: req.body.description,
 price: Number(req.body.price)

}
await req.storage.createCar(car)

res.redirect('/')

    },
    get(req,res){
res.render('create')
    }
}