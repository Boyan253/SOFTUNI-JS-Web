//TODO replace with actual service
const cryptoService = require("../services/crypto");


 function preload(){

return async function(req,res,next){

  
const id = req.params.id;
//TODO change property name to match the collection
const crypto = await cryptoService.getCryptoById(id);

res.locals.crypto = crypto;

next()

}


}
module.exports = preload