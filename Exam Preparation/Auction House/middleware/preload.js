//TODO replace with actual service
const auctionService = require('../services/auction')


 function preload(){

return async function(req,res,next){


const id = req.params.id;
//TODO change property name to match the collection
const auction = await auctionService.getAuctionById(id);

res.locals.auction = auction;

next()

}


}
module.exports = preload