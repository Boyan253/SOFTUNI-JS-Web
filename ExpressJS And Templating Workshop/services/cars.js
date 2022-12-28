const e = require('express')
const fs = require('fs/promises')
const { emitKeypressEvents } = require('readline')


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
    const data = await read()
    const car = data[id]
    if (car) {
        return Object.assign({}, { id }, car)
    }else{
        return undefined
    }

}

async function getAll(query) {
    const data = await read()
    let cars =  Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v))

        if(query.search){
            cars = cars.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()) )
        }
        if(query.from){
            cars = cars.filter(c => c.price >= Number(query.from))
        } if(query.to){
            cars = cars.filter(c => c.price <= Number(query.to))
        }
        return cars
}
async function deleteCarById(id) {
    const data = await read()



    if (data.hasOwnProperty(id)) {
        delete data[id]
        
        await write(data)
    }
    else{
        throw new ReferenceError('No such ID in database')
    }


}
async function updateCarById(id, car) {
    const data = await read()



    if (data.hasOwnProperty(id)) {
         data[id] = car
        
        await write(data)
    }
    else{
        throw new ReferenceError('No such ID in database')
    }


}
async function createCar(car){
const cars = await read()
let id;
do {
    id = nextId()
} while (car.hasOwnProperty(id));


cars[id] = car

await write(cars)

}

function nextId(){
    return "xxxxxxxx-xxxx".replace(/x/g, () => (Math.random() * 16 | 0).toString(16))

}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        updateCarById,
        deleteCarById
    },
        next()
}