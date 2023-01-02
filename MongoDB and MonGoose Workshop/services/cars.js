const e = require('express')
const fs = require('fs/promises')
const { emitKeypressEvents } = require('readline')
const Car = require('../models/Car')
const { carViewModel } = require('./util')


const filepath = './services/data.json'
async function read() {
    try {


        const file = await fs.readFile(filepath)
        return JSON.parse(file)
    }
    catch (err) {

        console.error('Database read error')
        console.log(err)
        process.exit(1)
    }


}

async function write(data) {
    try {


        await fs.writeFile(filepath, JSON.stringify(data))

    }
    catch (err) {

        console.error('Database read error')
        process.exit(1)
    }



}
async function getById(id) {

    const car = await Car.findById(id).populate('accessories')
    if (car) {
        return carViewModel(car)
    } else {
        return undefined
    }
    // const data = await read()
    // const car = data[id]
    // if (car) {
    //     return Object.assign({}, { id }, car)
    // }else{
    //     return undefined
    // }

}





async function getAll(query) {
   

    const options = {}
    
    if (query.search) {
    options.name = new RegExp(query.search, 'i')
    }
if (query.from) {
    options.price = {$gte: Number(query.from)}
}
if (query.to) {
    if(!query.price){
options.price = {}
    }
    options.price.$lte =  Number(query.to)
}
const cars = await Car.find(options)

    return cars.map(carViewModel)
    // const data = await read()
    // let cars =  Object
    //     .entries(data)
    //     .map(([id, v]) => Object.assign({}, { id }, v))

    //     if(query.search){
    //         cars = cars.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()) )
    //     }
    //     if(query.from){
    //         cars = cars.filter(c => c.price >= Number(query.from))
    //     } if(query.to){
    //         cars = cars.filter(c => c.price <= Number(query.to))
    //     }
    //     return cars
}
async function deleteCarById(id) {
    await Car.findByIdAndDelete(id)
    // const data = await read()



    // if (data.hasOwnProperty(id)) {
    //     delete data[id]

    //     await write(data)
    // }
    // else {
    //     throw new ReferenceError('No such ID in database')
    // }


}
async function updateCarById(id, car) {
    const existing=   await Car.findById(id)
    
    existing.name = car.name
    existing.description = car.description
    existing.imageUrl = car.imageUrl || undefined
    existing.price = car.price
    existing.accessories = car.accessories

    await existing.save()
    // const data = await read()



    // if (data.hasOwnProperty(id)) {
    //     data[id] = car

    //     await write(data)
    // }
    // else {
    //     throw new ReferenceError('No such ID in database')
    // }


}

async function attachAccessory(carId,accessoryId){
   const existing=  await Car.findById(carId)
existing.accessories.push(accessoryId)

await existing.save()
    
}
async function createCar(car) {

    const result = new Car(car)

    await result.save()
    // const cars = await read()
    // let id;
    // do {
    //     id = nextId()
    // } while (car.hasOwnProperty(id));


    // cars[id] = car

    // await write(cars)

}

function nextId() {
    return "xxxxxxxx-xxxx".replace(/x/g, () => (Math.random() * 16 | 0).toString(16))

}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        updateCarById,
        deleteCarById,
        attachAccessory
    },
        next()
}