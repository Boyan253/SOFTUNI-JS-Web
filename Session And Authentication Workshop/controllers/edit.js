module.exports = {
    async get(req, res) {
        let id = req.params.id
        let cars = await req.storage.getById(id)
        if(cars.owner != req.session.user.id){
            res.redirect('/login')
            console.log('User is not Owner!');
        }
        if (cars) {
            res.render('edit', { cars })

        } else {
            res.redirect('404')
        }

    },
    async post(req, res) {
        let id = req.params.id

        let car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price)
        }

        try {
            if(await req.storage.updateCarById(id, car,req.session.user.id) ){

                res.redirect('/')
            }else{
                res.redirect('/login')
            }
        } catch (err) {
            res.redirect('404')
        }

    }
}