const { Schema, model, Types: { ObjectId } } = require('mongoose')


const cryptoSchema = new Schema({


    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    payment: { type: String, enum: { values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'], message: 'Invalid payment method!' }, required: true },
    buyCrypto: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User', required: true }







})







const Crypto = model('Crypto', cryptoSchema)

module.exports = Crypto