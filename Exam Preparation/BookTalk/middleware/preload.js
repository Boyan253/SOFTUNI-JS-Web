//TODO replace with actual service
const bookService = require('../services/book')


 function preload(){

return async function(req,res,next){


const id = req.params.id;
//TODO change property name to match the collection
const book = await bookService.getBooksById(id)

res.locals.book = book;

next()

}


}
module.exports = preload