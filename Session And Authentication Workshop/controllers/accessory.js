module.exports = {
    get(req,res){
res.render('createAccessory')
    },
  async  post(req,res){
const accessory = {
    name: req.body.name,
    imageUrl: req.body.imageUrl || undefined,
    description: req.body.description,
    price: Number(req.body.price),
    owner: req.session.user.id
}

try {
    await req.accessory.createAccessory(accessory)
 res.redirect('/')
} catch (error) {
    console.log('error in creating accessory');
    console.log(error.message);
    res.redirect("/accessory")
}
    }
}