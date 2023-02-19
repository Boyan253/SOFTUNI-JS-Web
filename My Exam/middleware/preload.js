//TODO replace with actual service
const petstagramService = require('../services/photo');


function preload() {

    return async function (req, res, next) {


        
        const id = req.params.id;
        //TODO change property name to match the collection
        const photos = await petstagramService.getPhotoById(id);

        res.locals.photos = photos;

        next()

    }


}
module.exports = preload