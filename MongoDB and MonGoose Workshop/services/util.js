function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
    }



}


function carViewModel(car) {

    const model = {
        id: car._id,
        name: car.name,
        imageUrl: car.imageUrl,
        description: car.description,
        price: car.price,
        option: car.options,
        accessories: car.accessories
    }

    if (model.accessories.length > 0 && model.accessories[0].name) {
        console.log(model.accessories[0]);
        model.accessories = model.accessories.map(accessoryViewModel)
    }
    console.log(model);
    return model
}
module.exports = {
    carViewModel,
    accessoryViewModel
}