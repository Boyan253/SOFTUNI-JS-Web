const { Schema, model } = require('mongoose')
const noImg = ''
const accessorySchema = new Schema({
    name: {type: String},
    description: {type: String},
    imageUrl: {type: String, default: '' },
    price: {type: Number}
})

const accessory = model('Accessory', accessorySchema)


module.exports = accessory