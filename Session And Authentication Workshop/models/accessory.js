const { Schema, model, Types: {ObjectId} } = require('mongoose')
const noImg = ''
const accessorySchema = new Schema({
    name: {type: String},
    description: {type: String},
    imageUrl: {type: String, default: '' },
    price: {type: Number},
    owner: {type: ObjectId, ref: 'User'}
})

const accessory = model('Accessory', accessorySchema)


module.exports = accessory