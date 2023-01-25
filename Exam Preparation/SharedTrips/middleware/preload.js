//TODO replace with actual service

const tripService = require('../services/trip');


 function preload(populate){

return async function(req,res,next){
    
    const id = req.params.id;
if (populate) {
    
    res.locals.trip = await tripService.getTripAndUsers(id);

}
else{
    res.locals.trip =  await tripService.getTripById(id);
}
//TODO change property name to match the collection


next()

}


}
module.exports = preload