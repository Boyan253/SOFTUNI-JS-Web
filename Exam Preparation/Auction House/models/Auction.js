const { Schema, model, Types: {ObjectId} } = require('mongoose')


const auctionSchema = new Schema({

    title: {type: String, required: true},
    description: {type: String},
    category: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    author: {type: ObjectId,ref: "User", required: true},
    bidder: {type: [ObjectId],ref:"User",  default: []}



})



// •	Title – string (required)
// •	Description – string
// •	Category – string (required)
// •	Image URL – string
// •	Price – number (required)
// •	Author –reference to the User model (required)
// •	Bidder – reference to the User model



const Auction = model('Auction', auctionSchema)

module.exports = Auction