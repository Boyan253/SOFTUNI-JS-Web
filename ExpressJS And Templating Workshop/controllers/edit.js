module.exports = {
    async get(req, res) {
        let id = req.params.id
        let cars = await req.storage.getById(id)
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
            await req.storage.updateCarById(id, car)
            res.redirect('/')
        } catch (err) {
            res.redirect('404')
        }

    }
}