
const Auction = require('../models/Auction')




async function getAllAuctions() {


    return Auction.find({}).lean()


}

async function createAuction(auction) {

    const result = new Auction(auction)

    await result.save()




}

async function getAuctionById(id) {

    return Auction.findById(id).lean().populate('author').populate('bidder')


}
async function joinBid(auctionId, id) {

    const auction = await Auction.findById(auctionId)

    if (auction.bidder.includes(id)) {
        throw new Error('User already joined')
    }
    auction.bidder.push(id)

    await auction.save()
}


async function updateBid(auctionId,auction) {
    const existing = await Auction.findById(auctionId)


    console.log(existing.price);
    if (existing.price < auction.bid) {
        existing.price = auction.bid
    //    console.log(existing.price)
    } else {
        throw new Error('Bid is lower than current price')
    }
    await existing.save()

    
}
async function updateAuction(id, auction) {
    const existing = await Auction.findById(id)


    existing.title = auction.title,
        existing.description = auction.description,
        existing.category = auction.category,
        existing.image = auction.image
    existing.price = auction.price



    await existing.save()
}
module.exports = {
    getAllAuctions,
    createAuction,
    getAuctionById,
    joinBid,
    updateBid,
    updateAuction
}