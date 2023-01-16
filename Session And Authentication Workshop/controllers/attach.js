

module.exports = {
    async get(req, res) {
        const id = req.params.id
        try {
            
            const [car, accessories] = await Promise.all([
                req.storage.getById(id),
                req.accessory.getAll()])
if (car.owner) {
    
}
                const existingIds = car.accessories.map(a => a.id.toString())
                console.log(existingIds);
                const availableAccessories = accessories.filter(a => existingIds.includes(a.id.toString()) == false)
            res.render('attach',{car, accessories: availableAccessories})
        } catch (error) {
            res.redirect('/404')
            console.log(error.message);
        }


    }, async post(req, res) {
        const carId = req.params.id
        const accessoryId = req.body.accessory
        console.log(req.body);
        console.log(carId,accessoryId);
try {
    await req.storage.attachAccessory(carId,accessoryId)
    res.redirect('/')
} catch (error) {
    res.redirect('/attach/' + carId)
 console.log(error.message);
}

    }
}