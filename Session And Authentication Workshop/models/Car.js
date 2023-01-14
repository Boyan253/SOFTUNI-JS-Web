const {Schema, model, Types:{ObjectId}} = require('mongoose')

const carSchema = new Schema({
    name: {type:String},
    description: {type:String},
    imageUrl: {type:String},
    price: {type:Number, min: 0},
    options: {type: String},
    accessories:{type: [ObjectId], default: [], ref:'Accessory'},
    owner: {type: ObjectId, ref:'User'}
})

const Car = model('Car', carSchema)

module.exports = Car