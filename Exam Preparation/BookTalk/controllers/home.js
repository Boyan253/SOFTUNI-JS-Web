
const preload = require('../middleware/preload')
const { isUser } = require('../middleware/guards')
const { getAllBooks, joinWishList, getBooksCount } = require('../services/book')

const router = require('express').Router()


router.get('/', (req,res) => {


res.render('home', {Title: 'Home Page'})

})

router.get('/catalog', async (req,res) => {

    const books = await getAllBooks()
res.render('catalog', {Title: 'Catalog Page', books})
})

router.get('/catalog/:id',preload(), async (req,res) => {

const book = res.locals.book
if (req.session.user) {
       
    book.hasUser = true
    book.isOwner = req.session.user._id == book.owner._id


if (book.wishingList.some(a => a._id == req.session.user._id)) {
book.hasWished = true
}

}
res.render('details', {Title: "Book details"})

})

router.get('/wish/:id', preload(), isUser(),async (req,res) => {
    const bookId = req.params.id
    const userId = req.session.user._id

    try {
        await joinWishList(bookId, userId)
    
    
    } catch (err) {
        
    console.error(err);
    
    }
    finally{
        res.redirect('/catalog/' + bookId)
    }
    


})


router.get('/profile', preload(), isUser(), async (req,res) => {


    const bookByUser = await getBooksCount(res.locals.user._id)

    res.locals.user.tripCounts = bookByUser.length
    res.locals.user.book = bookByUser
    
    console.log(bookByUser);

    res.render('profile', {Title: 'Profile Page'})
})

module.exports = router